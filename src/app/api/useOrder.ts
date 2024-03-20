import { db } from "../firebase/config"
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
} from "firebase/firestore"

interface Order {
    id: DocumentReference
    items: DocumentReference[],
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    receiverEmail: string,
    deliveryService: string,
    totalQuantity: number,
    totalPrice: number,
    dateIssued: Timestamp    
}

export const useOrder = () => {
  
  //creates order
  const createOrder = async (
    data: Order
  ): Promise<DocumentReference | undefined> => {
    try {
        const createOrderRef = await addDoc(collection(db, "order"), data);
        return createOrderRef;
    } catch (error) {
        console.error("Error fetching sender account:", error);
        throw error;
    }
  };

  // fetches order
  const fetchOrder = async (
    orderRef: DocumentReference
  ): Promise<Order | undefined> => {
    try {
        const docSnapshot: DocumentSnapshot = await getDoc(orderRef);
        if (docSnapshot.exists()){
            return{
                id: docSnapshot.ref,
                ...docSnapshot.data()
            } as Order;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error("Error getting order: ", error)
        throw error;
    }
  };

  // update chosen order
  const updateOrder = async (
    orderRef: DocumentReference,
    data: Partial<Order>
  ): Promise<void> => {
    try {
        await updateDoc(orderRef, data);
    } catch (error) {
        console.error("Error updating delivery service: ", error);
        throw error;
    }
  };

  // delete order 
  const removeOrder = async (
    orderRef: DocumentReference
  ): Promise<void> => {
      try {
          await deleteDoc(orderRef);
      } catch (error) {
          console.error("Error in removing the order: ", error);
          throw error;
      }
  };

  return {
      createOrder, fetchOrder, updateOrder, removeOrder
  };
};
