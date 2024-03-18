"use client";

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

//Real world row = col, col = row

export default function Page() {
  return (
    <div className="">
      <Card className="max-w-screen m-12">
        <div class="grid grid-rows-2 grid-cols-4 gap-4">
          <Card className="row-span-3 col-span-1 mt-2 ml-2 mb-2">
            <CardContent className="mt-4">
              <div>
                <p class="font-bold text-lg mb-4">Track a Package</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input type="number" id="number-input" placeholder="RTN" />
                <Button>Track</Button>
              </div>
              <div>
                <div>
                  <p class="font-bold text-lg mt-9">View Details</p>
                  <p class="font-bold font text-sm text-[#808080]">
                    #RTN 12345789
                  </p>
                </div>
                <div className="mt-2">
                  <div>
                    <Checkbox id="sent" />
                    <label
                      htmlFor="sent"
                      className="ml-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sent Out
                    </label>
                  </div>
                  <div>
                    <Checkbox id="sorting_arr" />
                    <label
                      htmlFor="sorting_arr"
                      className="ml-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      At delivery facility hub
                    </label>
                  </div>
                  <div>
                    <Checkbox id="sorting_dep" />
                    <label
                      htmlFor="sorting_dep"
                      className="ml-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In transit
                    </label>
                  </div>
                  <div>
                    <Checkbox id="out" />
                    <label
                      htmlFor="out"
                      className="ml-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Arrived at logistic partner
                    </label>
                  </div>
                  <div>
                    <Checkbox id="arrived" />
                    <label
                      htmlFor="arrived"
                      className="ml-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Order placed
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="row-span-2 col-span-1 mt-2">
            <div>
              <div className="pt-2 pl-2">
                <p class="font-sans text-4xl font-bold">69</p>
              </div>
              <div className="pl-2 pb-2">
                <p>En Route</p>
              </div>
            </div>
          </Card>
          <Card className="row-span-2 col-span-1 mt-2">
            <div>
              <div className="pt-2 pl-2">
                <p class="font-sans text-4xl font-bold">325</p>
              </div>
              <div className="pl-2 pb-2">
                <p>Delivered</p>
              </div>
            </div>
          </Card>
          <Card className="row-span-2 col-span-1 mt-2 mr-2">
            <div>
              <div className="pt-2 pl-2">
                <p class="font-sans text-4xl font-bold">43</p>
              </div>
              <div className="pl-2 pb-2">
                <p>Pending</p>
              </div>
            </div>
          </Card>
          <div className="row-span-1 col-span-3 rounded-lg border bg-card text-card-foreground shadow-sm mr-2 mb-2 flex flex-col ">
            <CardHeader className="text-base font-bold flex">
              Order History
            </CardHeader>
            <CardContent className="text-base font-bold">
              1234 Orders
            </CardContent>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RTN</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>mm/dd/yy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <Button className="mt-1.5 mb-1.5">View Details</Button>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <Button className="mt-1.5 mb-1.5">View Details</Button>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <Button className="mt-1.5 mb-1.5">View Details</Button>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <Button className="mt-1.5 mb-1.5">View Details</Button>
                  </TableRow>
                  <TableRow>
                    <TableCell>12345678901</TableCell>
                    <TableCell>Balay ni Mayang</TableCell>
                    <TableCell>In transit</TableCell>
                    <TableCell>01/01/24</TableCell>
                    <Button className="mt-1.5 mb-1.5">View Details</Button>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
