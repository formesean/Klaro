import { db } from "../firebase/config";
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Sender {
  id: DocumentReference;
  email: string;
  name: string;
  address: string;
  parcels: Parcel[];
}

interface Parcel {
  id: DocumentReference;
  rtn: string;
  order: DocumentReference;
  currentStatus: string;
  currentLocation: string;
  deliveryDate: Date;
}

export const useSender = () => {
  /**
   * Creates a new sender.
   * @param {Sender} data - The data of the sender to create.
   * @returns {Promise<DocumentReference>} - A promise that resolves with the reference to the newly created sender document.
   */
  const createSender = async (
    data: Sender
  ): Promise<DocumentReference | undefined> => {
    try {
      const senderRef = await addDoc(collection(db, "senderAccounts"), data);
      return senderRef;
    } catch (error) {
      console.error("Error creating sender:", error);
      throw error;
    }
  };

  /**
   * Retrieves the document reference of a sender based on the provided email.
   * @param {string} sessionEmail - The email of the sender whose document reference is to be retrieved.
   * @returns {Promise<DocumentReference | undefined>} - A promise that resolves with the document reference of the sender or undefined if not found.
   */
  const getDocRef = async (
    sessionEmail: string
  ): Promise<DocumentReference | undefined> => {
    try {
      const querySnapshot = await getDocs(collection(db, "senderAccounts"));
      const senderDoc = querySnapshot.docs.find(
        (doc) => doc.data().email === sessionEmail
      );
      if (senderDoc) {
        return senderDoc.ref;
      } else {
        console.error("Sender document not found for email:", sessionEmail);
        return undefined;
      }
    } catch (error) {
      console.error("Error getting sender document reference:", error);
      return undefined;
    }
  };

  /**
   * Retrieves a sender by its document reference.
   * @param {DocumentReference} senderRef - The document reference of the sender to retrieve.
   * @returns {Promise<Sender | undefined>} - A promise that resolves with the retrieved sender data or undefined if not found.
   */
  const fetchSender = async (
    senderRef: DocumentReference
  ): Promise<Sender | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(senderRef);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.ref,
          ...docSnapshot.data(),
        } as Sender;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting sender:", error);
      throw error;
    }
  };

  /**
   * Updates an existing sender by its reference.
   * @param {DocumentReference} senderRef - The document reference of the sender to update.
   * @param {Partial<Sender>} data - The partial data to update the sender with.
   * @returns {Promise<void>} - A promise that resolves when the update is successful.
   */
  const updateSender = async (
    senderRef: DocumentReference,
    data: Partial<Sender>
  ): Promise<void> => {
    try {
      await updateDoc(senderRef, data);
    } catch (error) {
      console.error("Error updating sender:", error);
      throw error;
    }
  };

  /**
   * Removes a sender by its reference.
   * @param {DocumentReference} senderRef - The document reference of the sender to remove.
   * @returns {Promise<void>} - A promise that resolves when the removal is successful.
   */
  const removeSender = async (senderRef: DocumentReference): Promise<void> => {
    try {
      await deleteDoc(senderRef);
    } catch (error) {
      console.error("Error removing sender:", error);
      throw error;
    }
  };

  return {
    createSender,
    getDocRef,
    fetchSender,
    updateSender,
    removeSender,
  };
};
