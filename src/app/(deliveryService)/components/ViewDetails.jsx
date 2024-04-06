import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
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
import { Separator } from "../../../components/ui/separator";
import { useDeliveryService } from "../../api/useDeliveryService";
import { useItems } from "../../api/useItems";
import Loader from "./Loader";

export function ViewDetails({ docRef }) {
  const { fetchOrder } = useOrders();
  const { fetchDeliveryService } = useDeliveryService();
  const { fetchItem } = useItems();
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  const [deliveryServiceData, setDeliveryServiceData] = useState();
  const [itemsData, setItemsData] = useState([]);
  const [merchandiseSubtotal, setMerchandiseSubtotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const handleDetails = async () => {
    setIsLoading(true);

    const orderData = await fetchOrder(docRef.orderRef);
    const deliveryServiceData = await fetchDeliveryService(
      orderData.deliveryService
    );

    const itemsData = [];
    for (const itemRef of orderData.items) {
      const itemSnapshot = await fetchItem(itemRef);
      itemsData.push(itemSnapshot);
    }

    setOrderData(orderData);
    setDeliveryServiceData(deliveryServiceData);
    setItemsData(itemsData);
    setMerchandiseSubtotal(orderData.totalPrice - orderData.shippingFee);
    setShippingTotal(orderData.shippingFee);
    setTotalPayment(orderData.totalPrice);

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={handleDetails}
        className="hover:bg-[#292524] hover:text-[#FAFAFA] relative w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        View Details
      </DialogTrigger>
      <DialogContent className="flex flex-col max-md:w-full">
        <DialogHeader>
          <DialogTitle className="pb-4">Parcel Details</DialogTitle>
          <DialogDescription>
            <Card>
              <CardContent className="flex flex-col gap-5 max-h-[500px] w-full p-5 overflow-y-auto scrollbar-thin">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Loader className="items-center justify-center" />
                    ) : (
                      <div>
                        <div className="flex flex-col gap-2 pb-4">
                          <p className="text-sm text-muted-foreground">
                            Recipient Information
                          </p>
                          <Separator />
                          <p>
                            {orderData?.receiverName} |{" "}
                            {orderData?.receiverEmail} |{" "}
                            {orderData?.receiverAddress}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 pb-4">
                          <p className="text-sm text-muted-foreground">
                            Delivery Service Information
                          </p>
                          <Separator />
                          <p>
                            {deliveryServiceData?.name} |{" "}
                            {deliveryServiceData?.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Loader className="items-center justify-center" />
                    ) : (
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
                    )}
                  </CardContent>
                </Card>

                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Loader className="items-center justify-center" />
                    ) : (
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
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
