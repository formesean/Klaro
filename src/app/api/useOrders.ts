import {
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/config";

interface Order {
  id: DocumentReference;
  sender: DocumentReference;
  deliveryService: DocumentReference;
  items: DocumentReference[];
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  receiverEmail: string;
  deliveryServiceName: string;
  totalQuantity: number;
  totalPrice: number;
  dateIssued: Timestamp;
}

export const useOrders = () => {
  const initOrder = async (): Promise<string | undefined> => {
    const initData = {
      id: null,
      sender: DocumentReference,
      deliveryService: DocumentReference,
      // items: DocumentReference[],
      senderName: "",
      senderAddress: "",
      receiverName: "",
      receiverAddress: "",
      receiverEmail: "",
      deliveryServiceName: "",
      totalQuantity: 0,
      totalPrice: 0,
      dateIssued: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "order"), initData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      return undefined;
    }
  };

  return { initOrder };
};
