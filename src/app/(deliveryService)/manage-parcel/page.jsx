"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { ArrowUpDown, Loader, MoreHorizontal, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label } from "@radix-ui/react-dropdown-menu";
import { DeliveryStatus } from "../../dashboard/@sender/components/DeliveryStatus";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";



export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
    <div class="py-40 pr-20 pl-20">
      <Card className="">
        <CardHeader className="flex">
          <CardTitle> Parcel Tracking Number </CardTitle>
          <CardDescription> RTN: #123456789 </CardDescription>
          <h3>Order Status: In Transit</h3>
        </CardHeader>
        <Separator className="my-3" />
        <CardContent className="p-6">
          <div className="rounded-lg border grid grid-cols-4 grid-rows-2">
            <Card className="col-span-1 rounded-tl-lg">
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <h2>Lysander S. Uy</h2>
                <br />
                <h2>lysander.uy@gmail.com</h2>
                <br />
                <h2>
                  Block 5 Lot 6 Annex 1, Villa del Rio, Babag 2, Lapu-Lapu City,
                  Cebu, Philippines
                </h2>
              </CardContent>
            </Card>
            <Card className="col-span-3 rounded-tr-lg">
              <CardContent>
                <div className="my-10 grid grid-cols-5 grid-row-2">
                  <div className="flex col-span-5 pt-5">
                    <RadioGroup className="flex space-x-20 m-10">
                      <div className="flex-col">
                        <div className="">
                          <RadioGroupItemWithIcons
                            value="option-order"
                            id="option-order"
                            selected="option-order"
                            className="h-16 w-16 my-2"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="option-order"
                            className="justify-self-center"
                          >
                            <div className="flex flex-col justify-center pl-2">
                              <p className="text-sm text-[#808080]">
                                mm/dd/yyyy
                              </p>
                              <h1 className="font-bold text-base border-slate-600">
                                Order Placed
                              </h1>
                              <p className="text-[#ffffffdb] text-sm">
                                Ready for pick up
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="">
                          <RadioGroupItemWithIcons
                            value="option-center"
                            id="option-center"
                            selected="option-center"
                            className="h-16 w-16 my-2"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="option-center"
                            className="justify-self-center"
                          > 
                            <div className="flex flex-col justify-center pl-2">
                              <p className="text-sm text-[#808080]">
                                mm/dd/yyyy
                              </p>
                              <h1 className="font-bold text-base border-slate-600">
                                Arrived at Sorting Center
                              </h1>
                              <p className="text-[#ffffffdb] text-sm">
                                Logistics Facility: Central Nigeria
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="">
                          <RadioGroupItemWithIcons
                            value="option-intransit"
                            id="option-intransit"
                            selected="option-intransit"
                            className="h-16 w-16 my-2"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="option-intransit"
                            className="justify-self-center"
                          > 
                            <div className="flex flex-col justify-center pl-2">
                              <p className="text-sm text-[#808080]">
                                mm/dd/yyyy
                              </p>
                              <h1 className="font-bold text-base border-slate-600">
                                In Transit
                              </h1>
                              <p className="text-[#ffffffdb] text-sm">
                                On its way to the next logistics facility
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="">
                          <RadioGroupItemWithIcons
                            value="option-hub"
                            id="option-hub"
                            selected="option-hub"
                            className="h-16 w-16 my-2"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="option-hub"
                            className="justify-self-center"
                          > 
                            <div className="flex flex-col justify-center pl-2">
                              <p className="text-sm text-[#808080]">
                                mm/dd/yyyy
                              </p>
                              <h1 className="font-bold text-base border-slate-600">
                                Arrived at the Logistics Hub
                              </h1>
                              <p className="text-[#ffffffdb] text-sm">
                                Logistics Facility: NASA Headquarters
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="">
                          <RadioGroupItemWithIcons
                            value="option-delivered"
                            id="option-delivered"
                            selected="option-delivered"
                            className="h-16 w-16 my-2"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="option-delivered"
                            className="justify-self-center"
                          > 
                            <div className="flex flex-col justify-center pl-2">
                              <p className="text-sm text-[#808080]">
                                mm/dd/yyyy
                              </p>
                              <h1 className="font-bold text-base border-slate-600">
                                Delivered
                              </h1>
                              <p className="text-[#ffffffdb] text-sm">
                                Parcel has been delivered
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="my-20 row-span-5 col-start-5 flex justify-end pr-2">
                    <Button className="height-30px">Confirm</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4 rounded-b-lg">
              <CardHeader>
                <CardTitle>Item Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 grid-rows-1">
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
