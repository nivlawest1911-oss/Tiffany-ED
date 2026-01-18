// Mock Firebase - No Firebase dependency
// This file provides mock exports to prevent build errors

export const auth = null;
export const firestore = null;
export const db = null;

// Mock functions
export const collection = () => null;
export const query = () => null;
export const getDocs = () => Promise.resolve({ docs: [] });
export const where = () => null;
export const orderBy = () => null;
export const signInWithPopup = (...args: any[]) => Promise.resolve(null);
export const signOut = (...args: any[]) => Promise.resolve();
export const onAuthStateChanged = () => () => { };
export const GoogleAuthProvider = class { };

// Mock Types
export type User = any;

export default {
    auth,
    firestore,
    db,
};
