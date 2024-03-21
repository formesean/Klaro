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
  /**
   * Checks if a user has a delivery role.
   * @param {string} sessionEmail - The email of the user.
   * @returns {Promise<boolean>} A Promise resolving to true if the user has a delivery role, false otherwise.
   */
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

  /**
   * Checks if a sender exists based on the provided email.
   * @param {string} sessionEmail - The email of the sender.
   * @returns {Promise<boolean>} A Promise resolving to true if the sender exists, false otherwise.
   */
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

  return { checkRole, senderExists };
};
