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
import { db } from "../firebase/config";

interface Item {
  id: DocumentReference;
  name: string;
  price: number;
  quantity: number;
}

export const useItem = () => {
  /**
   * Creates a new item in Firestore.
   * @param {Item} data - The data of the item to be created.
   * @returns {Promise<DocumentReference | undefined>} A promise that resolves with the reference to the newly created item, or undefined if an error occurs.
   */
  const createItem = async (
    data: Item
  ): Promise<DocumentReference | undefined> => {
    try {
      const itemRef = await addDoc(collection(db, "items"), data);
      return itemRef;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  };

  /**
   * Fetches all items from the "items" collection in Firestore.
   * @returns {Promise<Item[]>} A promise that resolves with an array containing all fetched items, or rejects if an error occurs.
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
   * Fetches an item from Firestore based on its reference.
   * @param {DocumentReference} itemRef - The reference to the item.
   * @returns {Promise<Item | undefined>} A promise that resolves with the fetched item data, or undefined if the item does not exist or an error occurs.
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
      console.error("Error getting item:", error);
      throw error;
    }
  };

  /**
   * Updates an existing item in Firestore.
   * @param {DocumentReference} itemRef - The reference to the item to be updated.
   * @param {Partial<Item>} data - The partial data with which to update the item.
   * @returns {Promise<void>} A promise that resolves when the item has been successfully updated, or rejects if an error occurs.
   */
  const updateItem = async (
    itemRef: DocumentReference,
    data: Partial<Item>
  ): Promise<void> => {
    try {
      await updateDoc(itemRef, data);
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  };

  /**
   * Removes an item from Firestore.
   * @param {DocumentReference} itemRef - The reference to the item to be removed.
   * @returns {Promise<void>} A promise that resolves when the item has been successfully removed, or rejects if an error occurs.
   */
  const removeItem = async (itemRef: DocumentReference): Promise<void> => {
    try {
      await deleteDoc(itemRef);
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
    }
  };

  return { createItem, fetchItems, fetchItem, updateItem, removeItem };
};
