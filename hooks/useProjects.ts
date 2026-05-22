'use client';

import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Project } from '@/lib/types';
import { ProjectFormData } from '@/lib/validations';

const PROJECTS_COLLECTION = 'projects';

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async (includeDrafts = false) => {
    setLoading(true);
    setError(null);
    try {
      const q = includeDrafts 
        ? query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'))
        : query(collection(db, PROJECTS_COLLECTION), where('status', '==', 'published'), orderBy('createdAt', 'desc'));
      
      const snapshot = await getDocs(q);
      const projects: Project[] = [];
      snapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
      });
      return projects;
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectBySlug = useCallback(async (slug: string, includeDrafts = false) => {
    setLoading(true);
    try {
      const q = includeDrafts
        ? query(collection(db, PROJECTS_COLLECTION), where('slug', '==', slug))
        : query(collection(db, PROJECTS_COLLECTION), where('slug', '==', slug), where('status', '==', 'published'));
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Project;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (slug: string, data: Partial<Project>) => {
    setLoading(true);
    try {
      const docRef = doc(collection(db, PROJECTS_COLLECTION));
      const payload = {
        ...data,
        slug,
        id: docRef.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(docRef, payload);
      return docRef.id;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    setLoading(true);
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchProjects,
    fetchProjectBySlug,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject
  };
}
