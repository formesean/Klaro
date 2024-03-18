"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { Card, CardHeader } from "../../../components/ui/card";
import {
  Table,
  TableBody,
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
import { Label } from "../../../components/ui/label";
import { useItem } from "../../api/useItem";
import { useEffect, useState } from "react";

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
  const { createItem, fetchItems, fetchItem, updateItem, removeItem } =
    useItem();
  const [itemData, setItemData] = useState({
    itemName: "",
    itemQuantity: 0,
    itemPrice: 0,
  });
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    const getItems = async () => {
      const itemsData = await fetchItems();
      setItems(itemsData);
    };
    getItems();
  }, [fetchItems]);

  //FOR CONSULTATION
  function processOrder(data) {
    //processes order.
    const userData = {
      receiverName: data.receiverName,
      receiverEmail: data.receiverName,
      receiverAddress: data.receiverAddress,
    };
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function handleItem(e) {
    e.preventDefault();

    try {
      if (!itemData.itemName || !itemData.itemQuantity || !itemData.itemPrice) {
        throw new Error("All fields are required");
      }

      const itemRef = await createItem(itemData);

      setItemData({
        itemName: "",
        itemQuantity: 0,
        itemPrice: 0,
      });
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  }

  const handleRemoveItem = async (item) => {
    await removeItem(item.id);
    const updatedItems = await fetchItems();
    setItems(updatedItems);
  };

  return (
    <>
      <Card className="m-12">
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
              {/* w-screen mx-6 max-md:w-full max-md:pr-[55px] */}
              <div className="flex justify-between py-4 mx-3 max-md:flex-col">
                <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                  <Label htmlFor="itemName">item:</Label>
                  <Input
                    type="text"
                    id="itemName"
                    value={itemData.itemName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                  <Label htmlFor="quantity">quantity:</Label>
                  <Input
                    type="number"
                    id="itemQuantity"
                    value={itemData.itemQuantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                  <Label htmlFor="price">price:</Label>
                  <Input
                    type="number"
                    id="itemPrice"
                    value={itemData.itemPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end mr-6 mb-3 max-md:mr-8">
                <Button onClick={handleItem}>Add Item</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.itemQuantity}</TableCell>
                      <TableCell className="text-right">
                        {item.itemPrice}
                      </TableCell>
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
                            <DropdownMenuItem
                              onClick={() => handleRemoveItem(item)}
                            >
                              Delete content
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
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
