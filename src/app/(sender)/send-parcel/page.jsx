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
import { useDeliveryService } from "../../api/useDeliveryService";

const FormSchema = z.object({
  receiverName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  receiverEmail: z.string().email().min(3, {
    message: "Invalid email address",
  }),
  receiverAddress1: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  receiverAddress2: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
});

export default function Forms() {
  const { fetchDeliveryServices } = useDeliveryService();

  const router = useRouter();
  const { data: session } = useSession();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
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
      receiverAddress1: "",
      receiverAddress2: "",
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
    const addressValue1 = form.watch("receiverAddress1");
    const addressValue2 = form.watch("receiverAddress2");
    const complete =
      nameValue !== "" &&
      emailValue !== "" &&
      addressValue1 !== "" &&
      addressValue2 !== "" &&
      Object.keys(selectedOption).length > 0 &&
      items.length > 0;

    setIsFormComplete(complete);
  }, [form, items]);

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
  }, [form]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form.getValues()));
  }, [form]);

  useEffect(() => {
    localStorage.setItem("itemData", JSON.stringify(itemData));
  }, [itemData]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue =
      id === "itemPrice" || id === "itemQuantity"
        ? parseFloat(value, 10)
        : value;
    setItemData((prevState) => ({
      ...prevState,
      [id]: parsedValue,
    }));
  };

  const clearData = () => {
    form.reset({
      receiverName: "",
      receiverEmail: "",
      receiverAddress1: "",
      receiverAddress2: "",
    });
    setItems([]);
    setValue("");
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

  const handlePopOver = async () => {
    setOpen(true);
    setOptions(await fetchDeliveryServices());
  };

  return (
    <>
      <div className="py-7 px-10">
        <Card className="p-8 flex flex-col gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processOrder)}>
              <div className="grid grid-cols-5 grid-rows-1 max-xl:flex max-xl:flex-col gap-5">
                <Card className="row-span-1 col-span-4 w-full">
                  <CardHeader>Recipient Information</CardHeader>
                  <CardContent>
                    <div className="flex max-md:flex-col gap-5">
                      <FormField
                        control={form.control}
                        name="receiverName"
                        render={({ field }) => (
                          <>
                            <FormItem className="w-full">
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
                            <FormItem className="w-full">
                              <FormLabel>email:</FormLabel>
                              <FormControl>
                                <Input type="string" {...field} />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverAddress1"
                        render={({ field }) => (
                          <>
                            <FormItem className="w-full">
                              <FormLabel>address:</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Street Name, Building, House No."
                                  type="string"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverAddress2"
                        render={({ field }) => (
                          <>
                            <FormItem className="w-full">
                              <FormLabel className="text-transparent select-none">
                                address:
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Barangay, City, Province, Region"
                                  type="string"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="row-span-1 col-span-1 w-full">
                  <CardHeader>Delivery Service</CardHeader>
                  <CardContent>
                    <Popover open={open} onOpenChange={handlePopOver}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={open}
                          className="w-full justify-between mt-8 max-lg:mt-0"
                        >
                          {value
                            ? options.find((option) => option.name === value)
                                ?.name
                            : "Options"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search delivery service" />
                          <CommandEmpty>
                            No delivery service found.
                          </CommandEmpty>
                          <CommandList>
                            {options.map((option) => (
                              <CommandItem
                                key={option.name}
                                value={option.name}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                  setSelectedOption(option);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === option.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.name}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>

          <Card>
            <CardHeader>Order Contents</CardHeader>
            <div className="flex justify-between py-4 mx-3 max-md:flex-col">
              <div className="mx-3 w-screen max-md:w-full max-md:pe-3">
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

          <div className="flex justify-end">
            <ConfirmationPane
              formData={form.getValues()}
              item={items}
              deliveryServiceData={selectedOption}
              isFormComplete={isFormComplete}
              sessionEmail={session?.user.email}
              clearData={clearData}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
