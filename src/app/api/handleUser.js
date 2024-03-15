import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  setDoc,
  where,
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

  return !snapshot.empty;
}

export async function createSenderAccount(sessionEmail) {
  try {
    const sessionsCollection = collection(db, "sessions");
    const sessionsQuery = query(sessionsCollection);
    const sessionsSnapshot = await getDocs(sessionsQuery);

    sessionsSnapshot.forEach(async () => {
      const usersCollection = collection(db, "users");
      const usersQuery = query(
        usersCollection,
        where("email", "==", sessionEmail)
      );
      const usersSnapshot = await getDocs(usersQuery);

      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        const userID = userDoc.id;

        const senderAccountsRef = doc(db, "senderAccounts", userID);
        await setDoc(senderAccountsRef, { userID });
      }
    });
  } catch (error) {
    throw error;
  }
}
