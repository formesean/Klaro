"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useOrder } from "../../api/useOrder";
import { useItem } from "../../api/useItem";
import { date } from "zod";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  //adds item
  async function addItem() {
    //first item
    const item1Data = {
      name: "First Item",
      price: 1111,
      quantity: 11,
    };

    const savedItemReferences = [];
    //creates item
    const item1Ref = await useItem().createItem(item1Data);
    savedItemReferences.push(item1Ref);
    console.log("Item created successfully with ID:", item1Ref?.id);
    console.log("Item created successfully with Reference:", item1Ref);
  
    //fetches item
    const item1Details = await useItem().fetchItem(item1Ref);
    console.log(item1Details);

    //second item
    const item2Data = {
      name: "Second Item",
      price: 2222,
      quantity: 22,
    };

    //creates item
    const item2Ref = await useItem().createItem(item2Data);
    savedItemReferences.push(item2Ref);
    console.log("Item created successfully with ID:", item2Ref?.id);
    console.log("Item created successfully with Reference:", item2Ref);
  
    //fetches item
    const item2Details = await useItem().fetchItem(item2Ref);
    console.log(item2Details);

    await useItem().removeItem(item2Ref);
    savedItemReferences.pop(item2Ref);

    const oras = new Date();
    
    const order = {
      items: savedItemReferences,
      senderName: "Sample Name",
      senderAddress: "Sample Address",
      receiverName: "Sample Receiver Name",
      receiverAddress: "Sample Receiver Address",
      receiverEmail: "Sample Email",
      deliveryService: "Sample Delivery Service",
      totalQuantity: 12,
      totalPrice: 6969.12,
      dateIssued: oras.getDate() //date lng sa sample rman sd
  }

    //creates order
    const orderRef = await useOrder().createOrder(order);
    const orderDetails = await useOrder().fetchOrder(orderRef);
    console.log(orderDetails);

    const newOrderData = {
      totalQuantity: 24
    }

    await useOrder().updateOrder(orderRef, newOrderData);

    await useOrder().removeOrder(orderRef);


    // const newData = {
    //   name: "Niggerness"
    // }
    // updates item details
    // await useItem().updateItem(itemRef, newData);

    //creates order with items shiz

  }

  return (
    <div>
      <h1>Sender Dashboard</h1>
      <br />
      <h1>Item</h1>
      <Button type="submit" className="w-full" onClick={addItem}>
        Add Item
      </Button>
    </div>
  );
}
