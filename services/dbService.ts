import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";
import { logger } from "./loggerService";

// Generic Database Service
export const dbService = {
  // Get all documents from a collection
  async getAll(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
      logger.log('error', `Failed to fetch ${collectionName}: ${error.message}`, 'Database');
      throw error;
    }
  },

  // Add a new document
  async add(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      logger.log('success', `Added to ${collectionName}: ${docRef.id}`, 'Database');
      return docRef.id;
    } catch (error: any) {
      logger.log('error', `Failed to add to ${collectionName}: ${error.message}`, 'Database');
      throw error;
    }
  },

  // Update a document
  async update(collectionName: string, id: string, data: any) {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      logger.log('success', `Updated ${collectionName}: ${id}`, 'Database');
    } catch (error: any) {
      logger.log('error', `Failed to update ${collectionName}: ${error.message}`, 'Database');
      throw error;
    }
  },

  // Delete a document
  async delete(collectionName: string, id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id));
      logger.log('warn', `Deleted from ${collectionName}: ${id}`, 'Database');
    } catch (error: any) {
      logger.log('error', `Failed to delete ${collectionName}: ${id}`, 'Database');
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribe(collectionName: string, callback: (data: any[]) => void) {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    }, (error) => {
      logger.log('error', `Subscription failed for ${collectionName}: ${error.message}`, 'Database');
    });
  }
};
