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
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export function ConfirmationPane({ processOrder, isFormComplete }) {
  const [orderData, setOrderData] = useState(null);

  const handleProcessOrder = () => {
    processOrder();
  };

  useEffect(() => {
    const data = localStorage.getItem("orderData");

    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  const merchandiseSubtotal = orderData
    ? orderData.items.reduce(
        (subtotal, item) => subtotal + item.itemPrice * item.itemQuantity,
        0
      )
    : 0;
  const shippingTotal = 50;
  const totalPayment = merchandiseSubtotal + shippingTotal;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          onClick={handleProcessOrder}
          disabled={!isFormComplete}
          className="select-none"
        >
          Process Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order Checkout</AlertDialogTitle>
          <AlertDialogDescription>
            <Card>
              <CardContent className="max-h-[500px] pt-[24px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <Card className="mb-4">
                  <CardHeader>Delivery Information</CardHeader>
                  <CardContent>
                    {orderData && (
                      <p>
                        {orderData.receiverName} | {orderData.receiverEmail} |{" "}
                        {orderData.receiverAddress}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardHeader>Item Information</CardHeader>

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
                        {orderData &&
                          orderData.items.map((item, index) => (
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
                  <CardHeader>Payment</CardHeader>

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
          <AlertDialogAction>Place Order</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
