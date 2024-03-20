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
import { Checkbox } from "../../../components/ui/checkbox";
import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <>
      <div className="max-w-screen mx-12 my-8 max-sm:m-3">
        <div className="grid grid-rows-5 grid-cols-4 max-lg:grid-rows-9 max-lg:grid-cols-3 gap-4">
          <Card className="row-span-5 col-span-1 max-lg:row-span-4 max-lg:col-span-3">
            <CardHeader>
              <CardTitle>Track a Package</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-4">
                <Input type="number" id="number-input" placeholder="RTN" />
                <Button>Track</Button>
              </div>

              <Separator className="my-3" />

              <div>
                <p className="font-bold text-lg">View Details</p>
                <p className="font-bold font text-sm text-[#808080]">
                  #RTN 12345789
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <RadioGroup defaultValue="option-order" className="gap-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItemWithIcons
                    value="option-sent"
                    id="option-sent"
                    selected="option-sent"
                    className="w-10 h-10"
                  />
                  <Label htmlFor="option-sent">Send Out</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItemWithIcons
                    value="option-hub"
                    id="option-hub"
                    selected="option-hub"
                    className="w-10 h-10"
                  />
                  <Label htmlFor="option-hub">At Delivery Facility Hub</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItemWithIcons
                    value="option-transit"
                    id="option-transit"
                    selected="option-transit"
                    className="w-10 h-10"
                  />
                  <Label htmlFor="option-transit">In Transit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItemWithIcons
                    value="option-partner"
                    id="option-partner"
                    selected="option-partner"
                    className="w-10 h-10"
                  />
                  <Label htmlFor="option-partner">
                    Arrived at Logistic Partner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItemWithIcons
                    value="option-order"
                    id="option-order"
                    selected="option-order"
                    className="w-10 h-10"
                  />
                  <Label htmlFor="option-order">Order Placed</Label>
                </div>
              </RadioGroup>
            </CardFooter>
          </Card>

          <Card className="row-span-1 col-span-1 max-lg:row-span-1 max-lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">69</CardTitle>
              <CardDescription className="text-lg">En Route</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-lg:row-span-1 max-lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">325</CardTitle>
              <CardDescription className="text-lg">Delivered</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-lg:row-span-1 max-lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-4xl">43</CardTitle>
              <CardDescription className="text-lg">Pending</CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-4 col-span-3 max-lg:row-span-4 max-lg:col-span-3">
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
