import { useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Separator } from "../../../components/ui/separator";
import { useToast } from "../../../components/ui/use-toast";
import { useOrders } from "../../api/useOrders";
import { useItems } from "../../api/useItems";
import { useSender } from "../../api/useSender";
import { useDeliveryService } from "../../api/useDeliveryService";
import { useParcels } from "../../api/useParcels";
import { Timestamp } from "firebase/firestore";

export function ConfirmationPane({
  formData,
  item,
  deliveryServiceData,
  isFormComplete,
  sessionEmail,
  clearData,
}) {
  const { getDocRef, fetchSender } = useSender();
  const { getDocRefByEmail } = useDeliveryService();
  const { createOrder } = useOrders();
  const { createItem } = useItems();
  const { createParcel, updateSenderParcels, updateDeliveryServiceParcels } =
    useParcels();

  const { toast } = useToast();
  const [recipientData, setRecipientData] = useState(formData);
  const [itemsData, setItemsData] = useState(item);
  const [showToast, setShowToast] = useState(false);

  const handleProcessOrder = () => {
    setRecipientData(formData);
    setItemsData(item);
    setShowToast(true);
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
    const itemsRef = [];
    const senderRef = await getDocRef(sessionEmail);
    const senderData = await fetchSender(senderRef);
    const deliveryServiceRef = await getDocRefByEmail(
      deliveryServiceData.email
    );
    for (const itemObject of itemsData) {
      const docRef = await createItem(itemObject);
      itemsRef.push(docRef);
    }
    const orderData = {
      items: itemsRef,
      sender: senderRef,
      senderName: senderData.fullName,
      senderEmail: senderData.email,
      senderAddress: senderData.address,
      receiverName: recipientData.receiverName,
      receiverEmail: recipientData.receiverEmail,
      receiverAddress:
        recipientData.receiverAddress1 + ", " + recipientData.receiverAddress2,
      deliveryService: deliveryServiceRef,
      totalQuantity: itemsData.reduce(
        (total, item) => total + item.itemQuantity,
        0
      ),
      shippingFee: shippingTotal,
      totalPrice: totalPayment,
      dateIssued: Timestamp.now(),
    };
    const orderRef = await createOrder(orderData);
    const rtn = Math.floor(Math.random() * 9000000000) + 1000000000;
    const currentLocation = senderData.address
      .split(",")
      .slice(1)
      .join(",")
      .trim();
    const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const parcelData = {
      orderRef,
      rtn: rtn,
      currentStatus: "Order Placed",
      currentLocation: currentLocation,
      deliveryDate: deliveryDate,
    };
    const parcelRef = await createParcel(parcelData);

    await updateSenderParcels(senderRef, parcelRef);
    await updateDeliveryServiceParcels(deliveryServiceRef, parcelRef);
    await clearData();
  };

  return (
    <AlertDialog open={showToast} onOpenChange={setShowToast}>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          onClick={handleProcessOrder}
          disabled={!isFormComplete}
        >
          Process Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col max-md:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Order Checkout</AlertDialogTitle>
          <AlertDialogDescription>
            <Card>
              <CardContent className="flex flex-col gap-5 max-h-[500px] w-full p-5 overflow-y-auto scrollbar-thin">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 pb-4">
                      <p className="text-sm text-muted-foreground">
                        Recipient Information
                      </p>
                      <Separator />
                      {recipientData && (
                        <p>
                          {recipientData.receiverName} |{" "}
                          {recipientData.receiverEmail} |{" "}
                          {recipientData.receiverAddress1},{" "}
                          {recipientData.receiverAddress2}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 pb-4">
                      <p className="text-sm text-muted-foreground">
                        Delivery Service Information
                      </p>
                      <Separator />
                      {deliveryServiceData && (
                        <p>
                          {deliveryServiceData.name} |{" "}
                          {deliveryServiceData.email}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-full">
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
                              <TableCell>₱{item.itemPrice}</TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                ₱{item.itemPrice * item.itemQuantity}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="w-full">
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
          <Button
            onClick={() => {
              setShowToast(false);
              handleOrder();
              toast({
                description: "Order Placed. Thank you!",
              });
            }}
          >
            Place Order
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
