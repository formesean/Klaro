import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function checkRole(email) {
  const userRef = collection(db, "deliveryAccounts");
  const q = query(userRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  return !snapshot.empty;
}
