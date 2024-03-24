import { db } from "../firebase/config";
import {
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Item {
  id: DocumentReference;
  name: string;
  price: number;
  quantity: number;
}

export const useItems = () => {
  /**
   * Creates a new item in the Firestore collection.
   * @param {Item} data - The data of the item to be created.
   * @returns {Promise<DocumentReference | undefined>} A Promise resolving to the reference of the created document, or undefined if an error occurs.
   */

  const createItem = async (
    data: Item
  ): Promise<DocumentReference | undefined> => {
    try {
      const createItemRef = await addDoc(collection(db, "items"), data);
      return createItemRef;
    } catch (error) {
      console.error("Error in creating item: ", error);
      return undefined;
    }
  };

  /**
   * Fetches an item from Firestore.
   * @param {DocumentReference} itemRef - The reference to the item document.
   * @returns {Promise<Item | undefined>} A Promise resolving to the fetched item, or undefined if the item does not exist or an error occurs.
   */
  const fetchItem = async (
    itemRef: DocumentReference
  ): Promise<Item | undefined> => {
    try {
      const docSnapshot: DocumentSnapshot = await getDoc(itemRef);

      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.ref,
          ...docSnapshot.data(),
        } as Item;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error in fetching item: ", error);
      return undefined;
    }
  };

  /**
   * Fetches all items from Firestore.
   * @returns {Promise<Item[] | undefined>} A Promise resolving to an array of fetched items, or undefined if an error occurs.
   */
  const fetchItems = async (): Promise<Item[] | undefined> => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items: Item[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Item[];
      return items;
    } catch (error) {
      console.error("Error getting items:", error);
      return undefined;
    }
  };

  /**
   * Updates an item in Firestore.
   * @param {DocumentReference} itemRef - The reference to the item document to be updated.
   * @param {Partial<Item>} data - The partial data of the item to be updated.
   * @returns {Promise<void>} A Promise resolving once the item is updated, or rejecting if an error occurs.
   */
  const updateItem = async (
    itemRef: DocumentReference,
    data: Partial<Item>
  ): Promise<void> => {
    try {
      await updateDoc(itemRef, data);
    } catch (error) {
      console.error("Error in updating item: ", error);
      throw error;
    }
  };

  /**
   * Removes an item from Firestore.
   * @param {DocumentReference} itemRef - The reference to the item document to be removed.
   * @returns {Promise<void>} A Promise resolving once the item is removed, or rejecting if an error occurs.
   */
  const removeItem = async (itemRef: DocumentReference): Promise<void> => {
    try {
      deleteDoc(itemRef);
    } catch (error) {
      console.error("Error in removing item: ", error);
      throw error;
    }
  };

  return {
    createItem,
    fetchItem,
    fetchItems,
    updateItem,
    removeItem,
  };
};
