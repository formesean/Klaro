// import { DocumentSnapshot } from "firebase-admin/firestore";
// import { db } from "../firebase/config";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   updateDoc,
//   setDoc,
//   where,
//   addDoc,
//   getDocFromServer,
//   deleteDoc,
// } from "firebase/firestore";

// //gets sender details 
// export async function fetchSenderAccount(sessionEmail)
// {
//   try {
//     const userRef = collection(db, "senderAccounts");
//     const q = query(userRef, where("email", "==", sessionEmail));
//     const snapshot = await getDocs(q);

//     let details = {};
//     snapshot.forEach(doc=>{
//       const data = doc.data();
//       details = {
//         senderID: doc.id,
//         email: data.email,
//         fullName: data.fullName,
//         address: data.address
//       }
//     });

//   return details;
//   } catch (error) {
//     console.error("Error fetching sender account:", error);
//     throw error;
//   }
// }

// //adds order to firebase
// export async function createOrder(order) {
//   try {
//     const userRef = collection(db, "order");
//     const q = await addDoc(userRef, order);
//     return q;
//   } catch (error) {
//     console.error("Error creating order: ", error);
//     throw error;
//   }
// }

// //fetches one chosen order from firebase
// export async function fetchOrder(orderRef){
//   try {
//     const userRef = doc(db, "order", orderRef);
//     const snapshot = await getDocFromServer(userRef);
  
//     if (!snapshot.exists()){
//       console.log("Order not found in the collection");
//       return null;
//     }
  
//     const data = snapshot.data();
  
//     const order = {
//       senderID: data.senderID,
//       items: data.items,
//       senderName: data.senderName,
//       senderAddress: data.senderAddress,
//       receiverName: data.receiverName,
//       receiverAddress: data.receiverAddress,
//       receiverEmail: data.receiverEmail,
//       deliveryService: data.deliveryService,
//       totalQuantity: data.totalQuantity,
//       totalPrice: data.totalPrice,
//       dateIssued: data.dateIssued 
//     };
    
//     return order;  
//   } catch (error) {
//     console.error("Error fetching order: ", error);
//     throw error;
//   }
// }

// //fetches all orders under sender name from firebase
// export async function fetchOrders(senderName) 
// {
//   try {
//     const userRef = collection(db, "order");
//     const q = query(userRef, where("senderName", "==", senderName));
//     const snapshot = await getDocs(q);  
  
//     const orders = [];
//     snapshot.forEach(doc=>{
//       const data = doc.data();
  
//       const order = {
//         senderID: data.senderID,
//         items: data.items,
//         senderName: data.senderName,
//         senderAddress: data.senderAddress,
//         receiverName: data.receiverName,
//         receiverAddress: data.receiverAddress,
//         receiverEmail: data.receiverEmail,
//         deliveryService: data.deliveryService,
//         totalQuantity: data.totalQuantity,
//         totalPrice: data.totalPrice,
//         dateIssued: data.dateIssued 
//       };
      
//       orders.push(order);
//     });
  
//     return orders;
//   } catch (error) {
//     console.error("Error fetching order: ", error);
//     throw error;
//   }
// }

// //updates chosen order document in firebase
// export async function updateOrder(orderRef, updatedData){
//   try {
//     const userRef = doc(db, "order", orderRef);
//     await updateDoc(orderRef, updatedData);
//   } catch (error) {
//     console.error("Error updating order: ", error);
//     throw error;
//   }
// }

// //removes chosen order document in firebase
// export async function removeOrder(orderRef){
//   try {
//     const userRef = doc(db, "order", orderRef);
//     await deleteDoc(userRef);
//   } catch (error) {
//     console.error("Error removing order: ", error);
//     throw error;
//   }
// }

// //removes all order documents in firebase
// export async function removeOrders(){
//   try {
//     const userRef = collection(db, "orders");
//     const snapshot = await getDocs(userRef);

//     if (snapshot.empty){
//       console.log("No orders found in the collection");
//       return;
//     }

//     const deletePromises = [];
//     snapshot.forEach(doc=> {
//       deletePromises.push(deleteDoc(doc.ref));
//     })


//   } catch (error) {
//     console.error("Error removing orders: ", error);
//     throw error;
//   }
// }

// //adds item document to firebase
// export async function createItem(item){
//   try {
//     const userRef = collection(db, "items");
//     const q = await addDoc(userRef, item);
//     return q;
//   } catch (error) {
//     console.error("Error creating item: ", error);
//     throw error;
//   }
// }

// //fetches one chosen item from firebase
// export async function fetchItem(itemRef){
//   try {
//     const userRef = doc(db, "items", itemRef);
//     const snapshot = await getDocFromServer(userRef);

//     if (!snapshot.exists()) {
//       console.log("Item not found in the collection");
//       return null;
//     }

//     const data = snapshot.data();

//     const item = {
//       name: data.name,
//       price: data.price,
//       quantity: data.quantity
//     }

//     return item;
//   } catch (error) {
//     console.error("Error fetching item:", error);
//     throw error;
//   }
// }

// //fetches all item documents from firebase
// export async function fetchItems(){
//   try {
//     const itemsRef = collection(db, "items");
//     const snapshot = await getDocs(itemsRef);

//     if (snapshot.empty){
//       console.log("No items found in the collection");
//       return [];
//     }

//     const items = [];
//     snapshot.forEach(doc=>{
//       const data = doc.data();
//       const item = {
//         name: data.name,
//         price: data.price,
//         quantity: data.quantity
//       };
//       items.push(item);
//     });

//     return items;
//   } catch (error) {
//     console.error("Error fetching items: ", error);
//     throw error;
//   }
// }

// //updates one chose item
// export async function updateItem(itemRef, updatedData){
//   try {
//     const userRef = doc(db, "items", itemRef);
//     await updateDoc(userRef, updatedData);
//   } catch (error) {
//     console.error("Error updating item:", error);
//     throw error;
//   }
// }

// //removes one chosen item from firebase
// export async function removeItem(itemRef){
//   try {
//     const userRef = doc(db, "items", itemRef);
//     const snapshot = await getDocFromServer(userRef);

//     if (!snapshot.exists()){
//       console.log("Item not found in the collection");
//       return;
//     }

//     await deleteDoc(userRef);
//   } catch (error) {
//     console.error("Error removing item: ", error);
//     throw error;
//   }
// }

// //removes all items from firebase 
// export async function removeItems(){
//   try {
//     const userRef = collection(db, "items");
//     const snapshot = await getDocs(userRef);

//     if (snapshot.empty){
//       console.log("No items found in the collection");
//       return;
//     }

//     const deletePromises = [];
//     snapshot.forEach(doc=> {
//       deletePromises.push(deleteDoc(doc.ref));
//     })


//   } catch (error) {
//     console.error("Error removing items: ", error);
//     throw error;
//   }
// }

