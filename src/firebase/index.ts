// Mock Firebase - No Firebase dependency
// This file provides mock exports to prevent build errors

export const auth = null;
export const firestore = null;
export const db = null;

// Mock functions
export const collection = (...args: any[]) => null;
export const query = (...args: any[]) => null;
export const getDocs = (...args: any[]) => Promise.resolve({ docs: [], forEach: (cb: any) => { } });
export const where = (...args: any[]) => null;
export const orderBy = (...args: any[]) => null;
export const signInWithPopup = (...args: any[]) => Promise.resolve(null);
export const signOut = (...args: any[]) => Promise.resolve();
export const onAuthStateChanged = (auth: any, callback: (user: any) => void) => {
    // Immediately call back with null to simulate no user in mock
    callback(null);
    return () => { };
};
export const GoogleAuthProvider = class { };

// Mock Types
export type User = any;

export default {
    auth,
    firestore,
    db,
};
