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
  updateDoc,
} from "firebase/firestore";

interface DeliveryService {
  id: DocumentReference;
  email: string;
  name: string;
  parcels: Parcel[];
}

interface Sender {
  id: DocumentReference;
  email: string;
  name: string;
  address: string;
  parcels: Parcel[];
}

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

interface Parcel {
  id: DocumentReference;
  rtn: string;
  order: DocumentReference;
  currentStatus: string;
  currentLocation: string;
  deliveryDate: Date;
}

interface Item {
  id: DocumentReference;
  name: string;
  price: number;
  quantity: number;
}

export const useDeliveryService = () => {
  /**
   * Creates a new delivery service.
   * @param {DeliveryService} data - The data of the delivery service to create.
   * @returns {Promise<DocumentReference>} - A promise that resolves with the reference to the newly created delivery service document.
   */
  const createDeliveryService = async (
    data: DeliveryService
  ): Promise<DocumentReference | undefined> => {
    try {
      const deliveryServiceRef = await addDoc(
        collection(db, "deliveryAccounts"),
        data
      );
      return deliveryServiceRef;
    } catch (error) {
      console.error("Error creating delivery service:", error);
      throw error;
    }
  };

  /**
   * Retrieves a delivery service by its document reference.
   * @param {DocumentReference} deliveryServiceRef - The document reference of the delivery service to retrieve.
   * @returns {Promise<DeliveryService | undefined>} - A promise that resolves with the retrieved delivery service data or undefined if not found.
   */
  const fetchDeliveryService = async (
    deliveryServiceRef: DocumentReference
  ): Promise<DeliveryService | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(deliveryServiceRef);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.ref,
          ...docSnapshot.data(),
        } as DeliveryService;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting delivery service:", error);
      throw error;
    }
  };

  /**
   * Updates an existing delivery service by its reference.
   * @param {DocumentReference} deliveryServiceRef - The document reference of the delivery service to update.
   * @param {Partial<DeliveryService>} data - The partial data to update the delivery service with.
   * @returns {Promise<void>} - A promise that resolves when the update is successful.
   */
  const updateDeliveryService = async (
    deliveryServiceRef: DocumentReference,
    data: Partial<DeliveryService>
  ): Promise<void> => {
    try {
      await updateDoc(deliveryServiceRef, data);
    } catch (error) {
      console.error("Error updating delivery service:", error);
      throw error;
    }
  };

  /**
   * Removes a delivery service by its reference.
   * @param {DocumentReference} deliveryServiceRef - The document reference of the delivery service to remove.
   * @returns {Promise<void>} - A promise that resolves when the removal is successful.
   */
  const removeDeliveryService = async (
    deliveryServiceRef: DocumentReference
  ): Promise<void> => {
    try {
      await deleteDoc(deliveryServiceRef);
    } catch (error) {
      console.error("Error removing delivery service:", error);
      throw error;
    }
  };

  return {
    createDeliveryService,
    fetchDeliveryService,
    updateDeliveryService,
    removeDeliveryService,
  };
};