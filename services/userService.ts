import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { logger } from "./loggerService";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  balance: number;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: string;
  lastLogin: string;
  referralCode: string;
  referredBy?: string;
  stats: {
    gameWinnings: number;
    shortLinks: number;
    referrals: number;
    expenses: number;
  }
}

export const userService = {
  async syncUser(user: any) {
    if (!user) return null;
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUser: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        balance: 0,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        referralCode: user.uid.substring(0, 8).toUpperCase(),
        stats: {
          gameWinnings: 0,
          shortLinks: 0,
          referrals: 0,
          expenses: 0
        }
      };
      await setDoc(userRef, newUser);
      logger.log('success', `New user profile created: ${user.uid}`, 'Auth');
      return newUser;
    } else {
      await updateDoc(userRef, { lastLogin: new Date().toISOString() });
      return userDoc.data() as UserProfile;
    }
  },

  subscribeToProfile(uid: string, callback: (profile: UserProfile) => void) {
    return onSnapshot(doc(db, "users", uid), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as UserProfile);
      }
    });
  }
};

export const walletService = {
  async addTransaction(uid: string, tx: any) {
    try {
      const txRef = await setDoc(doc(collection(db, `users/${uid}/transactions`)), {
        ...tx,
        timestamp: new Date().toISOString()
      });
      logger.log('success', `Transaction recorded for ${uid}`, 'Wallet');
    } catch (error: any) {
      logger.log('error', `Failed to record transaction: ${error.message}`, 'Wallet');
    }
  },

  subscribeToTransactions(uid: string, callback: (txs: any[]) => void) {
    const q = query(collection(db, `users/${uid}/transactions`), orderBy("timestamp", "desc"), limit(50));
    return onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(txs);
    });
  }
};

export const orderService = {
  async placeOrder(uid: string, order: any) {
    try {
      const orderRef = await setDoc(doc(collection(db, "orders")), {
        ...order,
        userId: uid,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      logger.log('success', `Order placed successfully`, 'Orders');
    } catch (error: any) {
      logger.log('error', `Order failed: ${error.message}`, 'Orders');
    }
  },

  subscribeToUserOrders(uid: string, callback: (orders: any[]) => void) {
    const q = query(collection(db, "orders"), where("userId", "==", uid), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(orders);
    });
  }
};
