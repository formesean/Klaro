"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

/*===========================================================*/
const FormSchema = z.object({
  receiverName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  receiverEmail: z.string().email().min(3, {
    message: "Invalid email address",
  }),
  receiverAddress: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  itemName: z.string(),
  itemQuantity: z.number(),
  itemPrice: z.number(),
});

export default function SendParcel() {
  const { data: session } = useSession();
  // const router = useRouter();

  if (!session || session.user.role !== "sender") {
    return redirect("/");
  }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      receiverName: "",
      receiverEmail: "",
      receiverAddress: "",
      itemName: "",
      itemQuantity: "",
      itemPrice: "",
    },
  });

  //FOR CONSULTATION
  function processOrder(data) {
    //processes order.
    const userData = {
      receiverName: data.receiverName,
      receiverEmail: data.receiverName,
      receiverAddress: data.receiverAddress,
    };

    console.log(userData);
  }

  function addItem() {
    //adds added item into the table.
  }

  return (
    <>
      <Card className="m-12 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processOrder)}>
            <Card className="m-8">
              <CardHeader>Recipient Information</CardHeader>
              <div className="flex max-md:flex-col mb-6">
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>name:</FormLabel>
                        <FormControl>
                          <Input type="string" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiverEmail"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>email:</FormLabel>
                        <FormControl>
                          <Input type="string" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  className="py-4 mx-3"
                  control={form.control}
                  name="receiverAddress"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>address:</FormLabel>
                        <FormControl>
                          <Input type="string" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </Card>

            <Card className="m-8">
              <CardHeader>Parcel Contents</CardHeader>
              <div className="flex max-md:flex-col mb-6">
                <FormField
                  className="py-4 mx-3"
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>item:</FormLabel>
                        <FormControl>
                          <Input type="string" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  className="py-4 mx-3"
                  control={form.control}
                  name="itemQuanity"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>quantity:</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  className="py-4 mx-3"
                  control={form.control}
                  name="itemPrice"
                  render={({ field }) => (
                    <>
                      <FormItem className=" w-screen mx-6 max-md:w-full max-md:pr-[55px]">
                        <FormLabel>price:</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>

              <div className="flex justify-end mr-6 mb-3 max-md:mr-8">
                <Button type="submit" value="Submit" className="">
                  Add Item
                </Button>
              </div>

              <Table className>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>

                    <TableHead>quantity</TableHead>

                    <TableHead className="text-right">price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>data1</TableCell>
                    <TableCell>data2</TableCell>
                    <TableCell className="text-right">data3</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => null}>
                            Edit content
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => null}>
                            Delete content
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <div className="flex justify-end mr-8 mb-3 ">
              <Button type="submit" value="Submit">
                Process Order
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
