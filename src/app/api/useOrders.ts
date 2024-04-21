import { db } from "../firebase/config";
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Order {
  id: DocumentReference;
  items: DocumentReference[];
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  receiverEmail: string;
  deliveryService: string;
  totalQuantity: number;
  totalPrice: number;
  dateIssued: Timestamp;
}

export const useOrders = () => {
  /**
   * Creates a new order.
   * @param {Order} data - The data of the order to be created.
   * @returns {Promise<DocumentReference | undefined>} A Promise resolving to the reference of the created order document, or undefined if an error occurs.
   */
  const createOrder = async (
    data: Order
  ): Promise<DocumentReference | undefined> => {
    try {
      const createOrderRef = await addDoc(collection(db, "orders"), data);
      return createOrderRef;
    } catch (error) {
      console.error("Error creating order:", error);
      return undefined;
    }
  };

  /**
   * Fetches an order by its reference.
   * @param {DocumentReference} orderRef - The reference to the order document.
   * @returns {Promise<Order | undefined>} A Promise resolving to the fetched order object, or undefined if the order does not exist or an error occurs.
   */
  const fetchOrder = async (
    orderRef: DocumentReference
  ): Promise<Order | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(orderRef);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.ref,
          ...docSnapshot.data(),
        } as Order;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting order: ", error);
      return undefined;
    }
  };

  /**
   * Fetches all orders.
   * @returns {Promise<Order[] | undefined>} A Promise resolving to an array of fetched order objects, or undefined if an error occurs.
   */
  const fetchOrders = async (): Promise<Order[] | undefined> => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const items: Order[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Order[];
      return items;
    } catch (error) {
      console.error("Error getting orders:", error);
      return undefined;
    }
  };

  /**
   * Updates an existing order.
   * @param {DocumentReference} orderRef - The reference to the order document to be updated.
   * @param {Partial<Order>} data - The partial data to update the order with.
   * @returns {Promise<void>} A Promise that resolves when the update is successful.
   */
  const updateOrder = async (
    orderRef: DocumentReference,
    data: Partial<Order>
  ): Promise<void> => {
    try {
      await updateDoc(orderRef, data);
    } catch (error) {
      console.error("Error updating order: ", error);
      throw error;
    }
  };

  /**
   * Removes an order.
   * @param {DocumentReference} orderRef - The reference to the order document to be removed.
   * @returns {Promise<void>} A Promise that resolves when the removal is successful.
   */
  const removeOrder = async (orderRef: DocumentReference): Promise<void> => {
    try {
      await deleteDoc(orderRef);
    } catch (error) {
      console.error("Error in removing the order: ", error);
      throw error;
    }
  };

  return {
    createOrder,
    fetchOrder,
    fetchOrders,
    updateOrder,
    removeOrder,
  };
};
