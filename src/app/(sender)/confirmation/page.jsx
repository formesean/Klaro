"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function parcelConfirmation() {
  const { data: session } = useSession();

  if (!session || session.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <>
      <Card className="m-12">
        <CardContent>
          <Card className="m-8">
            <CardHeader>Delivery Address</CardHeader>
            <CardContent>
              <p>
                Sean Aguilar | seanaguilar698@gmail.com | South Cotabato,
                Mindanao
              </p>
            </CardContent>
          </Card>

          <Card className="m-8">
            <CardHeader>Products Ordered</CardHeader>

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
                  <TableRow>
                    <TableCell>8Ply Blue Cotton Yarn Wool Thread</TableCell>
                    <TableCell>52</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>104</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="m-8">
            <CardHeader>Payment</CardHeader>

            <CardContent>
              <Table>
                <TableBody className="text-right">
                  <TableRow>
                    <TableCell>Merchandise Subtotal:</TableCell>
                    <TableCell className="text-center">₱520.00</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Shipping Total:</TableCell>
                    <TableCell className="text-center">₱100.00</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-lg">Total Payment:</TableCell>
                    <TableCell className="text-center text-lg">
                      ₱570.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end mr-8 mb-3 max-md:flex-col">
            <Button className="mr-1 max-md:m-1 max-md:ml-8">
              Confirm Order
            </Button>
            <Button className="max-md:m-1 max-md:ml-8">Cancel Order</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
