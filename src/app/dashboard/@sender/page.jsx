"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { fetchSenderAccount, 
         createOrder, fetchOrder, fetchOrders, updateOrder, removeOrder, removeOrders,
         createItem, fetchItem, fetchItems, updateItem, removeItem, removeItems
} from "../../api/test";
import { useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [savedItemRefs, setSavedItemRefs] = useState([]);

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  //adds item
  async function addItem() {
    try {
      const item = {
        name: "Giant MTB",
        price: 140000.00,
        quantity: 1
      }
  
      const newItemRef = await createItem(item);
      setSavedItemRefs([...savedItemRefs, newItemRef.id]);
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  }

  //views one chosen item
  async function viewItem(){
    try {
      const itemRef = savedItemRefs[1];
      const item = await fetchItem(itemRef);
      
      console.log("Item Details: ", item);
    } catch (error) {
      console.error("Error viewing item: ", error);
    }
  }

  //views all items
  async function viewItems(){
    try {
      const allItems = fetchItems();
      console.log(allItems);
    } catch (error) {
      console.error("Error viewing all items: ", error);
    }
  }

  //updates one chosen item
  async function changeItem(){
    try {
      const itemRef = savedItemRefs[1];
      const newData = {
        name: "Trek RB",
        price: 130750,
        quantity: 2
      };
      await updateItem(itemRef, newData);
    } catch (error) {
      console.log("Error updating item: ", error);
    }
  }

  //deletes one chose item
  async function deleteItem(){
    try {
      const itemRef = savedItemRefs[0];
      await removeItem(itemRef);
      setSavedItemRefs(savedItemRefs.filter(ref=> ref != itemRef));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  }
  
  //deletes all items added
  async function deleteItems(){
    try {
      await removeItems();
      setSavedItemRefs([]);
    } catch (error) {
      console.error("Error deleting items: ", error);
    }
  }

  //Orders

  //creates order
  async function makeOrder() {
    const senderDetails = await fetchSenderAccount(session?.user.email);

    const order = {
        senderID: senderDetails.senderID,
        items: savedItemRefs,
        senderName: senderDetails.fullName,
        senderAddress: senderDetails.address,
        receiverName: "Boyax Utinan",
        receiverAddress: "123 Street, Tondo, USA",
        receiverEmail: "boyax@gmail.com",
        deliveryService: "LBC Express",
        totalQuantity: "3 Pcs",
        totalPrice: "PHP 420",
        dateIssued: "March 17, 2024",
      };
      
      await createOrder(order);
  }

  //views one order under sender name
  async function viewOrder(){
    try {
      const senderDetails = await fetchSenderAccount(session?.user.email);
      const orderRef = "";
      const order = await fetchOrder();

      console.log(order);
    } catch (error) {
      console.error("Error viewing order: ", order);
    }
  }

  //views all orders under sender name
  async function viewOrders () {
    try {
      const senderDetails = await fetchSenderAccount(session?.user.email);
      const orders = await fetchOrder(senderDetails.fullName);
 
      console.log(orders); 
    } catch (error) {
      console.error("Error viewing order: ", error);
    }
  }
  
  //updates one chosen order
  async function updateOrder(){
  try {
    const orderRef = "NvEP8IEI4Y6wNbE4x72a";
    const newData = {
      senderID: senderDetails.senderID,
      items: [],
      senderName: senderDetails.fullName,
      senderAddress: senderDetails.address,
      receiverName: "Boyax Dickness",
      receiverAddress: "123 Street, Tondo, USA",
      receiverEmail: "xayob@gmail.com",
      deliveryService: "LBC Express",
      totalQuantity: "3 Pcs",
      totalPrice: "PHP 420",
      dateIssued: "March 17, 2024",
    };
    await updateOrder(orderRef, newData); 
  } catch (error) {
    console.error("Error updating order: ", error);
  }  
  }

  //deletes one chosen order
  async function deleteOrder(){
    try {
      const orderRef = "NvEP8IEI4Y6wNbE4x72a";
      await removeOrder(orderRef);
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  }

  // delete all orders under sender name
  async function deleteOrders(){
    try {
      await removeItems();
    } catch (error) {
      console.error("Error deleting items: ", error);
    }
  }

  return (
    <div>
      <h1>Sender Dashboard</h1>
      <br />
      <h1>Item</h1>
      <Button type="submit" className="w-full" onClick={addItem}>
        Add Item
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={viewItem}>
        View Item
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={viewItems}>
        View All Items
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={changeItem}>
        Update Item
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={deleteItem}>
        Delete Item
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={deleteItems}>
        Delete All Items
      </Button>
      <br />
      <br />
      <h1>Order</h1>
      <Button type="submit" className="w-full" onClick={makeOrder}>
        Add Order
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={viewOrder}>
        View Order
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={viewOrders}>
        View All Orders
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={updateOrder}>
        Update Order
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={deleteOrder}>
        Delete Order
      </Button>
      <hr />
      <Button type="submit" className="w-full" onClick={deleteOrders}>
        Delete All Orders
      </Button>
    </div>
  );
}
