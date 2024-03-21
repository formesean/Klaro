import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useOrders } from "../../api/useOrders";
import { useItems } from "../../api/useItems";
import { useSender } from "../../api/useSender";
import { Timestamp } from "firebase/firestore";

export function ConfirmationPane({
  formData,
  item,
  deliveryServiceName,
  isFormComplete,
  sessionEmail,
}) {
  const { getDocRef, fetchSender } = useSender();
  const { createOrder } = useOrders();
  const { createItem } = useItems();

  const [recipientData, setRecipientData] = useState(formData);
  const [itemsData, setItemsData] = useState(item);

  const handleProcessOrder = () => {
    setRecipientData(formData);
    setItemsData(item);
  };

  const merchandiseSubtotal = itemsData
    ? itemsData.reduce(
        (subtotal, item) => subtotal + item.itemPrice * item.itemQuantity,
        0
      )
    : 0;
  const shippingTotal = 50;
  const totalPayment = merchandiseSubtotal + shippingTotal;

  const handleOrder = async () => {
    const itemsPath = [];
    const senderRef = await getDocRef(sessionEmail);
    const senderData = await fetchSender(senderRef);

    for (const itemObject of itemsData) {
      const docRef = await createItem(itemObject);
      itemsPath.push(docRef.path);
    }

    const orderData = {
      items: itemsPath,
      sender: senderRef.path,
      senderName: senderData.fullName,
      senderEmail: senderData.email,
      senderAddress: senderData.address,
      receiverName: recipientData.receiverName,
      receiverEmail: recipientData.receiverEmail,
      receiverAddress:
        recipientData.receiverName + ", " + recipientData.receiverAddress2,
      deliveryService: deliveryServiceName.name,
      totalQuantity: itemsData.reduce(
        (total, item) => total + item.itemQuantity,
        0
      ),
      totalPrice: totalPayment,
      dateIssued: Timestamp.now(),
    };

    const orderRef = await createOrder(orderData);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          onClick={handleProcessOrder}
          disabled={!isFormComplete}
        >
          Process Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order Checkout</AlertDialogTitle>
          <AlertDialogDescription>
            <Card>
              <CardContent className="max-h-[500px] pt-[24px] overflow-y-auto scrollbar-thin">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recipientData && (
                      <p>
                        {recipientData.receiverName} |{" "}
                        {recipientData.receiverEmail} |{" "}
                        {recipientData.receiverAddress1} <span>, </span>{" "}
                        {recipientData.receiverAddress2}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardHeader>
                    <CardTitle>Item Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Item Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {itemsData &&
                          itemsData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell>{item.itemPrice}</TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                {item.itemPrice * item.itemQuantity}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Delivery Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {deliveryServiceName.name} | {deliveryServiceName.email}
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody className="text-right">
                        <TableRow>
                          <TableCell>Merchandise Subtotal:</TableCell>
                          <TableCell className="text-center">
                            ₱{merchandiseSubtotal.toFixed(2)}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Shipping Total:</TableCell>
                          <TableCell className="text-center">
                            ₱{shippingTotal.toFixed(2)}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="text-lg">
                            Total Payment:
                          </TableCell>
                          <TableCell className="text-center text-lg">
                            ₱{totalPayment.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOrder}>
            Place Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
