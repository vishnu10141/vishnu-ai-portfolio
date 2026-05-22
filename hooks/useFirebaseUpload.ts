'use client';

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase/client';
import imageCompression from 'browser-image-compression';

export function useFirebaseUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression failed", error);
      return file; // Return original if compression fails
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Compress if it's an image
      let fileToUpload = file;
      if (file.type.startsWith('image/')) {
        fileToUpload = await compressImage(file);
      }

      const storageRef = ref(storage, `${path}/${Date.now()}_${fileToUpload.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            setError(error.message);
            setUploading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUploading(false);
              setUploadProgress(100);
              resolve(downloadURL);
            } catch (err: any) {
              setError(err.message);
              setUploading(false);
              reject(err);
            }
          }
        );
      });
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
      throw err;
    }
  };

  const removeFile = async (url: string) => {
    try {
      // Very basic extraction of the storage path from URL
      // In production, might need more robust parsing depending on URL structure
      const urlObj = new URL(url);
      const pathWithToken = urlObj.pathname.split('/o/')[1];
      if (!pathWithToken) return;
      const path = decodeURIComponent(pathWithToken.split('?')[0]);
      
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
    } catch (err: any) {
      console.error("Error deleting file:", err);
      // Don't throw, just log. We don't want a failed deletion to break the UI
    }
  };

  return {
    uploadProgress,
    uploading,
    error,
    uploadFile,
    removeFile,
  };
}
