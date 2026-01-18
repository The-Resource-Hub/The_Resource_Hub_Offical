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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  referralStats: {
    totalEarnings: number;
    networkSize: number;
    xp: number;
  },
  stats: {
    gameWinnings: number;
    shortLinks: number;
    referrals: number;
    expenses: number;
  },
  apiKeys?: {
    key: string;
    createdAt: string;
    label: string;
  }[]
}

export const userService = {
  async register(email: string, pass: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      
      const newUser: UserProfile = {
        uid: user.uid,
        email: email,
        displayName: name,
        photoURL: null,
        phoneNumber: null,
        balance: 100,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        referralCode: user.uid.substring(0, 8).toUpperCase(),
        referralStats: { totalEarnings: 0, networkSize: 0, xp: 0 },
        stats: { gameWinnings: 0, shortLinks: 0, referrals: 0, expenses: 0 }
      };
      
      await setDoc(doc(db, "users", user.uid), newUser);
      localStorage.setItem('user_session_token', user.uid);
      return newUser;
    } catch (error: any) {
      logger.log('error', `Registration failed: \${error.message}`, 'Auth');
      throw error;
    }
  },

  async login(email: string, pass: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      localStorage.setItem('user_session_token', user.uid);
      await updateDoc(doc(db, "users", user.uid), { lastLogin: new Date().toISOString() });
      return user;
    } catch (error: any) {
      logger.log('error', `Login failed: \${error.message}`, 'Auth');
      throw error;
    }
  },

  async logout() {
    await auth.signOut();
    localStorage.removeItem('user_session_token');
  },

  async generateApiKey(uid: string, label: string) {
    const userRef = doc(db, "users", uid);
    const key = `sk_live_\${Math.random().toString(36).substring(2, 15)}\${Math.random().toString(36).substring(2, 15)}`;
    const newKey = { key, label, createdAt: new Date().toISOString() };
    
    const userDoc = await getDoc(userRef);
    const apiKeys = (userDoc.data()?.apiKeys || []);
    await updateDoc(userRef, { apiKeys: [...apiKeys, newKey] });
    return key;
  },

  subscribeToProfile(uid: string, callback: (profile: UserProfile) => void) {
    return onSnapshot(doc(db, "users", uid), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as UserProfile);
      }
    });
  },

  subscribeToUserShortlinks(uid: string, callback: (links: any[]) => void) {
    const q = query(collection(db, `users/\${uid}/shortlinks`), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(links);
    });
  }
};

export const walletService = {
  async addTransaction(uid: string, tx: any) {
    try {
      await setDoc(doc(collection(db, `users/\${uid}/transactions`)), {
        ...tx,
        timestamp: new Date().toISOString()
      });
      logger.log('success', `Transaction recorded for \${uid}`, 'Wallet');
    } catch (error: any) {
      logger.log('error', `Failed to record transaction: \${error.message}`, 'Wallet');
    }
  },

  subscribeToTransactions(uid: string, callback: (txs: any[]) => void) {
    const q = query(collection(db, `users/\${uid}/transactions`), orderBy("timestamp", "desc"), limit(50));
    return onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(txs);
    });
  }
};

export const orderService = {
  async placeOrder(uid: string, order: any) {
    try {
      await setDoc(doc(collection(db, "orders")), {
        ...order,
        userId: uid,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      logger.log('success', `Order placed successfully`, 'Orders');
    } catch (error: any) {
      logger.log('error', `Order failed: \${error.message}`, 'Orders');
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
