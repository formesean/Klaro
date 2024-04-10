"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../../components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
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
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";

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
            <CardTitle>RTN: {params.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="border-0">
              <CardContent className="p-0 grid grid-cols-4 grid-rows-2 max-xl:grid-cols-3 max-xl:grid-rows-4 gap-3">
                <Card className="col-span-1 row-span-1 max-xl:col-span-3">
                  <CardHeader>
                    <CardTitle>Information Details</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-muted-foreground">
                        Recipient Information
                      </p>
                      <Separator />
                      <p>Bea Belle | vaebelle@gmail.com | USC TC</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-muted-foreground">
                        Delivery Service Information
                      </p>
                      <Separator />
                      <p>LyLy Move | lylymove@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3 row-span-1 max-xl:row-span-2">
                  <CardHeader>
                    <CardTitle>Update Status</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-10">
                    <RadioGroup className="flex flex-row max-lg:flex-col justify-evenly max-lg:gap-5">
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
                            <h1 className="font-bold text-base border-slate-600">
                              Order Placed
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Ready for pick up
                            </p>
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
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
                            <h1 className="font-bold text-base border-slate-600">
                              Arrived at Sort Center
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Logistics Facility:
                            </p>
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
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
                            <h1 className="font-bold text-base border-slate-600">
                              In Transit
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              On its way to the next logistics facility
                            </p>
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
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
                            <h1 className="font-bold text-base border-slate-600">
                              Arrived at the Logistics Hub
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Logistics Facility:
                            </p>
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
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
                            <h1 className="font-bold text-base border-slate-600">
                              Delivered
                            </h1>
                            <p className="text-[#ffffffdb] text-sm">
                              Parcel has been delivered
                            </p>
                            <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="primary"
                            className="bg-primary text-white dark:text-black"
                          >
                            Update
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm Parcel Status Update
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to update the status of this
                              parcel to:{" "}
                              <span className="text-white">[New status]</span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-4 row-span-1 max-xl:col-span-3 max-xl:row-span-1">
                  <CardHeader>
                    <CardTitle>Item Ordered</CardTitle>
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
                  </CardContent>
                  <CardFooter className="flex justify-end mr-5">
                    <div>
                      <h3 className="font-bold text-base border-slate-600">
                        Merchandise Subtotal: ₱10,949.99
                      </h3>
                      <h3 className="text-base border-slate-600">
                        Shipping Total: ₱50.00
                      </h3>
                      <h3 className="text-base border-slate-600">
                        Total Payment: ₱10,999.99
                      </h3>
                    </div>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
