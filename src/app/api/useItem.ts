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

interface Item {
    id: DocumentReference
    name: string,
    price: number,
    quantity: number
}

export const useItem = () => {
    //creates item
    const createItem = async (
        data: Item
    ): Promise<DocumentReference | undefined> => {
        try {
            const createItemRef = await addDoc(collection(db, "items"), data);
            return createItemRef;
        } catch (error) {
            console.error("Error in creating item: ", error);
            throw error;
        }
    };

    //fetches item
    const fetchItem = async (
        itemRef: DocumentReference
    ): Promise <Item | undefined> => {
        try {
            const docSnapshot:DocumentSnapshot = await getDoc(itemRef);

            if (docSnapshot.exists())
            {
                return {
                    id: docSnapshot.ref,
                    ...docSnapshot.data()
                } as Item;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error("Error in fetching order: ", error);
            throw error;
        }
    };
    
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

    const removeItem = async (
        itemRef: DocumentReference
    ): Promise<void> => {
        try {
            deleteDoc(itemRef);
        } catch (error) {
            console.error("Error in removing item: ", error);
            throw error;
        }
    }

    return {
        createItem, fetchItem, updateItem, removeItem
    };

};