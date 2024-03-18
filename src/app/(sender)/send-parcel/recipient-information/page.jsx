"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processOrder)}>
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
              <div className="flex justify-end mr-8 mb-3 ">
                <Button type="submit" value="Submit">
                  next
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
