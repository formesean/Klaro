"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function UpdateParcel({ params }) {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
    <>
      <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
        <Card>
          <CardHeader>
            <CardTitle> Parcel Tracking Number </CardTitle>
            <CardDescription className="flex flex-col">
              <span>Order Status: In Transit</span>
              <span>RTN: #123456789</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="-mt-2 mb-5" />

            <Card className="border-0">
              <CardContent className="p-0 grid grid-cols-4 grid-rows-2 max-lg:grid-cols-3 max-lg:grid-rows-4 gap-3">
                <Card className="col-span-1 row-span-1 max-xl:col-span-3">
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>Lysander S. Uy</h2>
                      <br />
                      <h2>lysander.uy@gmail.com</h2>
                      <br />
                      <h2>
                        Block 5 Lot 6 Annex 1, Villa del Rio, Babag 2, Lapu-Lapu
                        City, Cebu, Philippines
                      </h2>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3 row-span-1 max-xl:row-span-2">
                  <CardContent className="flex flex-col gap-10">
                    <RadioGroup className="flex flex-row max-lg:flex-col justify-evenly max-lg:gap-5 mt-5">
                      <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                        <RadioGroupItemWithIcons
                          value="option-order"
                          id="option-order"
                          selected="option-order"
                          className="h-16 w-16 my-2"
                        />
                        <Label
                          htmlFor="option-order"
                          className="justify-self-center"
                        >
                          <div className="flex flex-col justify-center pl-2">
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                            <h1 className="font-bold text-base border-slate-600">
                              Order Placed
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Ready for pick up
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                        <RadioGroupItemWithIcons
                          value="option-center"
                          id="option-center"
                          selected="option-center"
                          className="h-16 w-16 my-2"
                        />
                        <Label
                          htmlFor="option-center"
                          className="justify-self-center"
                        >
                          <div className="flex flex-col justify-center pl-2">
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                            <h1 className="font-bold text-base border-slate-600">
                              Arrived at Sort Center
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Logistics Facility:
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                        <RadioGroupItemWithIcons
                          value="option-intransit"
                          id="option-intransit"
                          selected="option-intransit"
                          className="h-16 w-16 my-2"
                        />
                        <Label
                          htmlFor="option-intransit"
                          className="justify-self-center"
                        >
                          <div className="flex flex-col justify-center pl-2">
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                            <h1 className="font-bold text-base border-slate-600">
                              In Transit
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              On its way to the next logistics facility
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                        <RadioGroupItemWithIcons
                          value="option-hub"
                          id="option-hub"
                          selected="option-hub"
                          className="h-16 w-16 my-2"
                        />
                        <Label
                          htmlFor="option-hub"
                          className="justify-self-center"
                        >
                          <div className="flex flex-col justify-center pl-2">
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                            <h1 className="font-bold text-base border-slate-600">
                              Arrived at the Logistics Hub
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Logistics Facility:
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                        <RadioGroupItemWithIcons
                          value="option-delivered"
                          id="option-delivered"
                          selected="option-delivered"
                          className="h-16 w-16 my-2"
                        />
                        <Label
                          htmlFor="option-delivered"
                          className="justify-self-center"
                        >
                          <div className="flex flex-col justify-center pl-2">
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                            <h1 className="font-bold text-base border-slate-600">
                              Delivered
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Parcel has been delivered
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end">
                      <Button>Confirm</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-4 row-span-1 max-xl:col-span-3 max-xl:row-span-1">
                  <CardHeader>
                    <CardTitle>Item Ordered</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
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
                          <TableCell>Hanni</TableCell>
                          <TableCell>₱10,999.99</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>₱10,999.99</TableCell>
                        </TableRow>
                        {/* {itemsData &&
                          itemsData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell>₱{item.itemPrice}</TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                ₱{item.itemPrice * item.itemQuantity}
                              </TableCell>
                            </TableRow>
                          ))} */}
                      </TableBody>
                    </Table>
                    <div className="flex flex-col justify-end max-xl:flex-col">
                      <Label>
                        <h3 className="text-base border-slate-600">Sender:</h3>
                        <h3 className="text-base border-slate-600">
                          Sender Location:
                        </h3>
                      </Label>
                      <Label>
                        <h3 className="font-bold text-base border-slate-600">
                          Merchandise Subtotal: ₱10,949.99
                        </h3>
                        <h3 className="text-base border-slate-600">
                          Shipping Total: ₱50.00
                        </h3>
                        <h3 className="text-base border-slate-600">
                          Total Payment: ₱10,999.99
                        </h3>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
