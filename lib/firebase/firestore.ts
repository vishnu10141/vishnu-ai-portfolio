import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  setDoc
} from 'firebase/firestore';
import { db } from './client';
import { Project, Experience } from '../types';

import { defaultProjects, defaultExperiences } from './defaultData';

export const subscribeToProjects = (callback: (projects: Project[]) => void) => {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(defaultProjects);
      return;
    }
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    callback(projects);
  }, (error) => {
    console.error('Error fetching projects:', error);
    callback(defaultProjects);
  });
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return defaultProjects;
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error in getProjects:', error);
    return defaultProjects;
  }
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), where('featured', '==', true), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return defaultProjects.filter(p => p.featured);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error in getFeaturedProjects:', error);
    return defaultProjects.filter(p => p.featured);
  }
};

export const createProject = async (projectData: Omit<Project, 'id' | 'order' | 'createdAt'>): Promise<string> => {
  // Get max order
  const projects = await getProjects();
  const maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.order)) : 0;

  const docRef = await addDoc(collection(db, 'projects'), {
    ...projectData,
    order: maxOrder + 1,
    createdAt: Date.now()
  });
  return docRef.id;
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, data);
};

export const updateProjectOrders = async (updates: { id: string, order: number }[]) => {
  const promises = updates.map(update => {
    const docRef = doc(db, 'projects', update.id);
    return updateDoc(docRef, { order: update.order });
  });
  await Promise.all(promises);
};

// EXPERIENCES

export const subscribeToExperiences = (callback: (experiences: Experience[]) => void) => {
  const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(defaultExperiences);
      return;
    }
    const experiences = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[];
    callback(experiences);
  }, (error) => {
    console.error('Error fetching experiences:', error);
    callback(defaultExperiences);
  });
};

export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return defaultExperiences;
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[];
  } catch (error) {
    console.error('Error in getExperiences:', error);
    return defaultExperiences;
  }
};

export const createExperience = async (expData: Omit<Experience, 'id' | 'order'>): Promise<string> => {
  const experiences = await getExperiences();
  const maxOrder = experiences.length > 0 ? Math.max(...experiences.map(e => e.order)) : 0;

  const docRef = await addDoc(collection(db, 'experiences'), {
    ...expData,
    order: maxOrder + 1
  });
  return docRef.id;
};

export const updateExperience = async (id: string, data: Partial<Experience>) => {
  const docRef = doc(db, 'experiences', id);
  await updateDoc(docRef, data);
};

export const updateExperienceOrders = async (updates: { id: string, order: number }[]) => {
  const promises = updates.map(update => {
    const docRef = doc(db, 'experiences', update.id);
    return updateDoc(docRef, { order: update.order });
  });
  await Promise.all(promises);
};
