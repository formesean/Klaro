import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const useUsers = () => {
  const checkRole = async (sessionEmail: string): Promise<boolean> => {
    try {
      const userRef = collection(db, "deliveryAccounts");
      const q = query(userRef, where("email", "==", sessionEmail));
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error("Error checking role:", error);
      return false;
    }
  };

  const senderExists = async (sessionEmail: string): Promise<boolean> => {
    try {
      const userRef = collection(db, "senderAccounts");
      const q = query(userRef, where("email", "==", sessionEmail));
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error("Error checking sender existence:", error);
      return false;
    }
  };

  const createSender = async (data: any): Promise<void> => {
    try {
      const userRef = collection(db, "senderAccounts");
      await addDoc(userRef, data);
    } catch (error) {
      console.error("Error creating sender:", error);
    }
  };

  return { checkRole, senderExists, createSender };
};
