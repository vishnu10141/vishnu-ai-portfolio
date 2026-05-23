'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon, FileText } from 'lucide-react';
import { useFirebaseUpload } from '@/hooks/useFirebaseUpload';
import Image from 'next/image';

interface UploaderProps {
  folder: string;
  accept?: string;
  onUploadSuccess: (url: string) => void;
  isPdf?: boolean;
}

export function Uploader({ folder, accept = "image/*", onUploadSuccess, isPdf = false }: UploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, uploadProgress, error } = useFirebaseUpload();

  const handleFile = async (file: File) => {
    try {
      const url = await uploadFile(file, folder);
      onUploadSuccess(url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 ${
          dragActive ? 'border-blue-500 bg-blue-500/[0.02] shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
        } ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} overflow-hidden`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="p-3 rounded-full bg-white/5">
            {isPdf ? (
              <FileText className={`w-8 h-8 ${dragActive ? 'text-blue-400' : 'text-white/40'}`} />
            ) : (
              <ImageIcon className={`w-8 h-8 ${dragActive ? 'text-blue-400' : 'text-white/40'}`} />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80">
              {uploading ? 'Uploading...' : `Click or drag ${isPdf ? 'PDF' : 'image'} to upload`}
            </p>
            <p className="text-xs text-white/40">
              {isPdf ? 'PDF files only' : 'SVG, PNG, JPG or GIF (max. 1MB due to compression)'}
            </p>
          </div>
        </div>

        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-xl overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
      
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
