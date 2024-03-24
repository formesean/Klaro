"use client";
import { useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";
import { ConfirmationPane } from "../components/ConfirmationPane";

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
});

export default function Forms() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: "",
    itemQuantity: 0,
    itemPrice: 0.0,
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      receiverName: "",
      receiverEmail: "",
      receiverAddress: "",
      items: [itemData],
    },
  });

  useEffect(() => {
    if (!session || session.user.role !== "sender") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    const nameValue = form.watch("receiverName");
    const emailValue = form.watch("receiverEmail");
    const addressValue = form.watch("receiverAddress");
    const complete =
      nameValue !== "" &&
      emailValue !== "" &&
      addressValue !== "" &&
      items.length > 0;

    setIsFormComplete(complete);
  }, [form.watch(), items]);

  useEffect(() => {
    const cachedFormData = localStorage.getItem("formData");
    if (cachedFormData) {
      const parsedData = JSON.parse(cachedFormData);
      form.reset(parsedData);
    }

    const cachedItemData = localStorage.getItem("itemData");
    if (cachedItemData) {
      const parsedItemData = JSON.parse(cachedItemData);
      setItemData(parsedItemData);
    }

    const cachedItems = localStorage.getItem("items");
    if (cachedItems) {
      const parsedData = JSON.parse(cachedItems);
      setItems(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form.getValues()));
  }, [form.getValues()]);

  useEffect(() => {
    localStorage.setItem("itemData", JSON.stringify(itemData));
  }, [itemData]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleItem = (e) => {
    e.preventDefault();

    try {
      if (!itemData.itemName || !itemData.itemQuantity || !itemData.itemPrice) {
        throw new Error("All fields are required");
      }

      const newItem = { ...itemData };

      setItems((prevItems) => [...prevItems, newItem]);

      setItemData({
        itemName: "",
        itemQuantity: 0,
        itemPrice: 0.0,
      });
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    try {
      const updatedItems = items.filter((item) => item !== itemToRemove);

      setItems(updatedItems);
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const processOrder = (data) => {
    // localStorage.setItem("orderData", JSON.stringify({ ...data, items }));
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

              <div className="flex justify-end mr-6 mb-3 max-md:mr-4">
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
              <ConfirmationPane
                formData={form.getValues()}
                item={items}
                isFormComplete={isFormComplete}
              />
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
