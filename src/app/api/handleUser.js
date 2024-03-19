import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  setDoc,
  where,
  addDoc,
} from "firebase/firestore";

export async function checkRole(sessionEmail) {
  const userRef = collection(db, "deliveryAccounts");
  const q = query(userRef, where("email", "==", sessionEmail));
  const snapshot = await getDocs(q);

  return !snapshot.empty;
}

export async function senderExists(sessionEmail) {
  const userRef = collection(db, "senderAccounts");
  const q = query(userRef, where("email", "==", sessionEmail));
  const snapshot = await getDocs(q);

  return !snapshot.empty
}

export async function createSender(data) {
  const userRef = collection(db, "senderAccounts");
  const q = await addDoc(userRef, data);
}

export async function createDeliveryService(data, sessionEmail) {
  const userRef = collection(db, "deliveryAccounts");
  const q = query(userRef, where("email", "==", sessionEmail));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;

    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.error(error);
    }
  }
}
