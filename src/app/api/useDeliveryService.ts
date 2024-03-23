import { db } from "../firebase/config";
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface DeliveryService {
  id: DocumentReference;
  email: string;
  name: string;
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
   * Retrieves the document reference of a delivery service based on the provided email.
   * @param {string} sessionEmail - The email of the delivery service whose document reference is to be retrieved.
   * @returns {Promise<DocumentReference | undefined>} - A promise that resolves with the document reference of the delivery service or undefined if not found.
   */
  const getDocRef = async (
    sessionEmail: string
  ): Promise<DocumentReference | undefined> => {
    try {
      const querySnapshot = await getDocs(collection(db, "deliveryAccounts"));
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
      console.error(
        "Error getting delivery service document reference:",
        error
      );
      return undefined;
    }
  };

  /**
   * Retrieves the document reference of a delivery service based on the provided email.
   * @param {string} email - The email of the delivery service whose document reference is to be retrieved.
   * @returns {Promise<DocumentReference | undefined>} - A promise that resolves with the document reference of the delivery service or undefined if not found.
   */
  const getDocRefByEmail = async (
    email: string
  ): Promise<DocumentReference | undefined> => {
    try {
      const querySnapshot = await getDocs(collection(db, "deliveryAccounts"));
      const senderDoc = querySnapshot.docs.find(
        (doc) => doc.data().email === email
      );
      if (senderDoc) {
        return senderDoc.ref;
      } else {
        console.error("Sender document not found for email:", email);
        return undefined;
      }
    } catch (error) {
      console.error(
        "Error getting delivery service document reference:",
        error
      );
      return undefined;
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
   * Fetches delivery services from Firestore.
   * @returns {Promise<DeliveryService[] | undefined>} A Promise resolving to an array of DeliveryService objects, or undefined if an error occurs.
   */
  const fetchDeliveryServices = async (): Promise<
    DeliveryService[] | undefined
  > => {
    try {
      const querySnapshot = await getDocs(collection(db, "deliveryAccounts"));
      const deliveryServices: DeliveryService[] = querySnapshot.docs.map(
        (doc) => ({
          ...doc.data(),
        })
      ) as DeliveryService[];
      return deliveryServices;
    } catch (error) {
      console.error("Error getting delivery services:", error);
      return undefined;
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
   * Updates the parcels field of an existing delivery service by its reference and appends a new parcel.
   * @param {DocumentReference} deliveryServiceRef - The document reference of the delivery service to update.
   * @param {Parcel} newParcel - The new parcel to append to the parcels field.
   * @returns {Promise<void>} - A promise that resolves when the update is successful.
   */
  const updateDeliveryServiceParcels = async (
    deliveryServiceRef: DocumentReference,
    newParcel: Parcel
  ): Promise<void> => {
    try {
      await updateDoc(deliveryServiceRef, {
        parcels: arrayUnion(newParcel),
      });
    } catch (error) {
      console.error("Error updating delivery service parcels:", error);
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
    getDocRef,
    getDocRefByEmail,
    fetchDeliveryService,
    fetchDeliveryServices,
    updateDeliveryService,
    updateDeliveryServiceParcels,
    removeDeliveryService,
  };
};
