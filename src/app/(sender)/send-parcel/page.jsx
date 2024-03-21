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
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../.././../lib/utils";

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

const frameworks = [
  {
    value: "option1",
    label: "option1",
  },
  {
    value: "option2",
    label: "option2",
  },
  {
    value: "option3",
    label: "option3",
  },
  {
    value: "option4",
    label: "option4",
  },
  {
    value: "option5",
    label: "option5",
  },
];

export default function Forms() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
            <div className="flex max-md:flex-col m-8">
              <div className="w-[1800px] max-md:w-full">
                <Card className="max-md:w-full">
                  <CardHeader>Recipient Information</CardHeader>
                  <div className="flex max-md:flex-col mb-6">
                    <FormField
                      control={form.control}
                      name="receiverName"
                      render={({ field }) => (
                        <>
                          <FormItem className="mx-6 max-md:w-full max-md:pr-[55px] w-full">
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
                          <FormItem className="mx-6 max-md:w-full max-md:pr-[55px] w-full">
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
                          <FormItem className="mx-6 max-md:w-full max-md:pr-[55px] w-full">
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
              </div>

              <Card className="ml-3 max-md:ml-0 max-md:mt-6">
                <CardHeader>Delivery Service</CardHeader>
                <CardContent>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={open}
                        className="w-[200px] justify-between mt-8"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select delivery service..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search delivery service..." />
                        <CommandEmpty>No delivery service found.</CommandEmpty>
                        <CommandList>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>

            <Card className="m-8">
              <CardHeader>Order Contents</CardHeader>
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
