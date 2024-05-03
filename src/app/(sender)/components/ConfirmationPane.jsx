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
import emailjs from "@emailjs/browser";
import { useMapBox } from "../../api/useMapBox";

export function ConfirmationPane({
  formData,
  item,
  deliveryServiceData,
  isFormComplete,
  sessionEmail,
  clearData,
  router,
  senderAddress,
  recipientAddress,
}) {
  const { getSenderDocRef, fetchSender } = useSender();
  const { createOrder } = useOrders();
  const { createItem } = useItems();
  const { createParcel, updateSenderParcels, updateDeliveryServiceParcels } =
    useParcels();
  const { getDeliveryServiceDocRef } = useDeliveryService();
  const { fetchGeocode, fetchDistance } = useMapBox();
  const { toast } = useToast();
  const [recipientData, setRecipientData] = useState(formData);
  const [itemsData, setItemsData] = useState(item);
  const [showToast, setShowToast] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

  const handleProcessOrder = async () => {
    const coordinateOne = await fetchGeocode(senderAddress, "first");
    const coordinateTwo = await fetchGeocode(recipientAddress, "second");
    const distance = await fetchDistance(coordinateOne, coordinateTwo);

    const shippingFee = calculateShippingFee(distance);
    setShippingFee(shippingFee);

    setRecipientData(formData);
    setItemsData(item);
    setShowToast(true);
  };

  const calculateShippingFee = (distance) => {
    const baseFee = 70;
    const excessKm = 200;
    const perKmFee = 5;

    if (distance <= 250) {
      return baseFee;
    } else {
      const excessDistance = distance - 250;
      const excessFee = (excessDistance / excessKm) * perKmFee;
      return Math.ceil(baseFee + excessFee);
    }
  };

  const merchandiseSubtotal = itemsData
    ? itemsData.reduce(
        (subtotal, item) => subtotal + item.itemPrice * item.itemQuantity,
        0
      )
    : 0;
  const shippingTotal = shippingFee;
  const totalPayment = merchandiseSubtotal + shippingTotal;

  const handleOrder = async () => {
    const itemsRef = [];
    const senderRef = await getSenderDocRef(sessionEmail);
    const senderData = await fetchSender(senderRef);
    const deliveryServiceRef = await getDeliveryServiceDocRef(
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
      receiverAddress: recipientAddress,
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
    const emailParams = {
      subject: `Your order ${rtn} has been placed`,
      message: `Hello ${recipientData.receiverName}, \n Your order ${rtn} has been placed`,
      deliveryServiceName: deliveryServiceData.name,
      items: itemsData.map((item) => `- ${item.itemName}`).join("\n"),
      totalAmount: totalPayment.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
      }),
      rtn: rtn,
      to_email: recipientData.receiverEmail,
    };
    emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      emailParams,
      process.env.NEXT_PUBLIC_EMAILJS
    );
    await clearData();
    router.replace("/dashboard");
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
                          {recipientData.receiverEmail} | {recipientAddress}
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
                              <TableCell>
                                {item.itemPrice.toLocaleString("en-PH", {
                                  style: "currency",
                                  currency: "PHP",
                                })}
                              </TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                {(
                                  item.itemPrice * item.itemQuantity
                                ).toLocaleString("en-PH", {
                                  style: "currency",
                                  currency: "PHP",
                                })}
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
                            {merchandiseSubtotal.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Shipping Total:</TableCell>
                          <TableCell className="text-center">
                            {shippingTotal.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="text-lg">
                            Total Payment:
                          </TableCell>
                          <TableCell className="text-center text-lg">
                            {totalPayment.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
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
