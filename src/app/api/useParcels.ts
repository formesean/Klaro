import { db } from "../firebase/config";
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

interface Parcel {
  id: DocumentReference;
  rtn: string;
  order: DocumentReference;
  currentStatus: string;
  currentLocation: string;
  deliveryDate: Date;
}

export const useParcels = () => {
  /**
   * Creates a new parcel.
   * @param {Parcel} data - The data of the parcel to be created.
   * @returns {Promise<DocumentReference | undefined>} A Promise resolving to the reference of the created parcel document, or undefined if an error occurs.
   */
  const createParcel = async (
    data: Parcel
  ): Promise<DocumentReference | undefined> => {
    try {
      const createParcelRef = await addDoc(collection(db, "parcels"), data);
      return createParcelRef;
    } catch (error) {
      console.error("Error creating parcel:", error);
      return undefined;
    }
  };

  /**
   * Fetches a parcel by its associated order reference.
   * @param {DocumentReference} orderRef - The reference to the order associated with the parcel.
   * @returns {Promise<Parcel | undefined>} A Promise resolving to the fetched parcel object, or undefined if the parcel does not exist or an error occurs.
   */
  const fetchParcel = async (
    orderRef: DocumentReference
  ): Promise<Parcel | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(orderRef);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.ref,
          ...docSnapshot.data(),
        } as Parcel;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting parcel: ", error);
      return undefined;
    }
  };

  /**
   * Returns the document reference for the parcel with the given Return Tracking Number (RTN).
   * @param {string} rtn - The Return Tracking Number (RTN) of the parcel to search for.
   * @returns {Promise<DocumentReference | undefined>} A Promise resolving to the document reference of the parcel with the given RTN, or undefined if not found.
   */
  const fetchParcelByRTN = async (
    rtn: string
  ): Promise<DocumentReference | undefined> => {
    try {
      const q = query(
        collection(db, "parcels"),
        where("rtn", "==", parseInt(rtn))
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        return snapshot.docs[0].ref;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting parcel by RTN:", error);
      return undefined;
    }
  };

  /**
   * Returns all the document references in the parcels field of the sender.
   * @param {DocumentReference} senderRef - The document reference of the sender.
   * @returns {Promise<DocumentReference[] | undefined>} A Promise resolving to an array of document references in the parcels field, or undefined if an error occurs.
   */
  const fetchSenderParcels = async (
    senderRef: DocumentReference
  ): Promise<DocumentReference[] | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(senderRef);
      if (docSnapshot.exists()) {
        const senderData = docSnapshot.data();
        if (senderData && senderData.parcels) {
          return senderData.parcels;
        }
      }
      return [];
    } catch (error) {
      console.error("Error getting sender parcel references:", error);
      return undefined;
    }
  };

  /**
   * Updates an existing parcel.
   * @param {DocumentReference} orderRef - The reference to the parcel document to be updated.
   * @param {Partial<Parcel>} data - The partial data to update the parcel with.
   * @returns {Promise<void>} A Promise that resolves when the update is successful.
   */
  const updateParcel = async (
    orderRef: DocumentReference,
    data: Partial<Parcel>
  ): Promise<void> => {
    try {
      await updateDoc(orderRef, data);
    } catch (error) {
      console.error("Error updating parcel: ", error);
      throw error;
    }
  };

  /**
   * Updates the parcels field of an existing sender by its reference and appends a new parcel.
   * @param {DocumentReference} senderRef - The document reference of the sender to update.
   * @param {Parcel} newParcel - The new parcel to append to the parcels field.
   * @returns {Promise<void>} - A promise that resolves when the update is successful.
   */
  const updateSenderParcels = async (
    senderRef: DocumentReference,
    newParcel: Parcel
  ): Promise<void> => {
    try {
      await updateDoc(senderRef, {
        parcels: arrayUnion(newParcel),
      });
    } catch (error) {
      console.error("Error updating sender parcels:", error);
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
   * Removes a parcel.
   * @param {DocumentReference} orderRef - The reference to the parcel document to be removed.
   * @returns {Promise<void>} A Promise that resolves when the removal is successful.
   */
  const removeParcel = async (orderRef: DocumentReference): Promise<void> => {
    try {
      await deleteDoc(orderRef);
    } catch (error) {
      console.error("Error in removing the parcel: ", error);
      throw error;
    }
  };

  return {
    createParcel,
    fetchParcel,
    fetchParcelByRTN,
    fetchSenderParcels,
    updateParcel,
    updateSenderParcels,
    updateDeliveryServiceParcels,
    removeParcel,
  };
};
