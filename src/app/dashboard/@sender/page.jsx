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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  const copyText = () => {
    const textToCopy = document.getElementById("textToCopy").innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <>
      <div className="max-w-screen mx-12 my-8 max-sm:m-3">
        <div className="grid grid-rows-5 grid-cols-5 max-xl:grid-rows-9 max-xl:grid-cols-3 gap-4">
          <Card className="row-span-5 col-span-2 max-xl:row-span-4 max-xl:col-span-3">
            <CardHeader>
              <CardTitle>Track a Package</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-4">
                <Input type="number" id="number-input" placeholder="RTN" />
                <Button>Track</Button>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center">
                <div className="mr-40">
                  <p className="font-bold text-lg">Parcel Details</p>
                  <p className="font-bold font text-sm text-[#808080]">
                    Bea Belle Therese B. Caños
                  </p>
                  <div className="flex gap-1">
                    <p
                      id="textToCopy"
                      className="font-bold font text-sm text-[#808080]"
                    >
                      1234578901
                    </p>
                    <button
                      onClick={copyText}
                      disabled={copied}
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-5 w-5 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                    >
                      <span class="sr-only">Copy</span>
                      {copied ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <RadioGroup defaultValue="option-order" className="gap-8">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <RadioGroupItemWithIcons
                      value="option-delivered"
                      id="option-delivered"
                      selected="option-delivered"
                      className="w-16 h-16"
                    />
                    <Label htmlFor="option-delivered">
                      <div className="flex flex-col justify-center pl-2">
                        <div className="flex justify-start items-center gap-4">
                          <h1 className="font-bold text-base">Delivered</h1>
                          <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                        </div>
                        <p className="text-[#ffffffdb]">
                          Parcel has been delivered
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <RadioGroupItemWithIcons
                      value="option-hub"
                      id="option-hub"
                      selected="option-hub"
                      className="w-16 h-16"
                    />
                    <Label htmlFor="option-hub">
                      <div className="flex flex-col justify-center pl-2">
                        <div className="flex justify-start items-center gap-4">
                          <h1 className="font-bold text-base">
                            Arrived at the Logistics Hub
                          </h1>
                          <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                        </div>
                        <p className="text-[#ffffffdb]">
                          &lt;Location of Logistics Facility&gt;
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <RadioGroupItemWithIcons
                      value="option-transit"
                      id="option-transit"
                      selected="option-transit"
                      className="w-16 h-16"
                    />
                    <Label htmlFor="option-transit">
                      <div className="flex flex-col justify-center pl-2">
                        <div className="flex justify-start items-center gap-4">
                          <h1 className="font-bold text-base">In Transit</h1>
                          <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                        </div>
                        <p className="text-[#ffffffdb]">
                          On its way to the next logistics facility
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <RadioGroupItemWithIcons
                      value="option-partner"
                      id="option-partner"
                      selected="option-partner"
                      className="w-16 h-16"
                    />
                    <Label htmlFor="option-partner">
                      <div className="flex flex-col justify-center pl-2">
                        <div className="flex justify-start items-center gap-4">
                          <h1 className="font-bold text-base">
                            Arrived at Sort Center
                          </h1>
                          <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                        </div>
                        <p className="text-[#ffffffdb]">
                          &lt;Location of Logistics Facility&gt;
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <RadioGroupItemWithIcons
                      value="option-order"
                      id="option-order"
                      selected="option-order"
                      className="w-16 h-16"
                    />
                    <Label htmlFor="option-order">
                      <div className="flex flex-col justify-center pl-2">
                        <div className="flex justify-center items-center gap-4">
                          <h1 className="font-bold text-base">Order Placed</h1>
                          <p className="text-sm text-[#808080]">mm/dd/yyyy</p>
                        </div>
                        <p className="text-[#ffffffdb]">Ready for pick-up</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardFooter>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">69</CardTitle>
              <CardDescription className="text-lg">En Route</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">325</CardTitle>
              <CardDescription className="text-lg">Delivered</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">43</CardTitle>
              <CardDescription className="text-lg">Pending</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-4 col-span-3 max-xl:row-span-4 max-xl:col-span-3">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>1234 Orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RTN</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>mm/dd/yy</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <TableCell>
                      <Button>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <TableCell>
                      <Button>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <TableCell>
                      <Button>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <TableCell>
                      <Button>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <TableCell>
                      <Button>View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
