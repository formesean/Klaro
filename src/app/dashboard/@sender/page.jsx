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
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";
import {
  Copy,
  Check,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

const data = [
  {
    rtn: 12345678901,
    recipient: "Bea Belle Therese B. Caños",
    status: "Order Placed",
    deliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Sean Karl Tyrese G. Aguilar",
    status: "In Transit",
    deliveryDate: new Date().toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Bea Belle Therese B. Caños",
    status: "Order Placed",
    deliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Sean Karl Tyrese G. Aguilar",
    status: "In Transit",
    deliveryDate: new Date().toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Bea Belle Therese B. Caños",
    status: "Order Placed",
    deliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Balay ni Mayang",
    status: "Order Placed",
    deliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Balay ni Mayang",
    status: "In Transit",
    deliveryDate: new Date().toLocaleDateString(),
  },
  {
    rtn: 12345678901,
    recipient: "Balay ni Mayang",
    status: "Order Placed",
    deliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  },
];

export const columns = [
  {
    accessorKey: "rtn",
    header: () => <div className="text-left">RTN</div>,
    cell: ({ row }) => {
      const rtn = row.getValue("rtn");

      return <div className="text-left font-medium">{rtn}</div>;
    },
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          title={
            column.getCanSort()
              ? column.getNextSortingOrder() === "asc"
                ? "Sort ascending"
                : column.getNextSortingOrder() === "desc"
                ? "Sort descending"
                : "Clear sort"
              : undefined
          }
        >
          Recipient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue("recipient")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          title={
            column.getCanSort()
              ? column.getNextSortingOrder() === "asc"
                ? "Sort ascending"
                : column.getNextSortingOrder() === "desc"
                ? "Sort descending"
                : "Clear sort"
              : undefined
          }
        >
          Delivery Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4">{row.getValue("deliveryDate")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const RTN = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(RTN.id)}
            >
              Copy RTN ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View order details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Dashboard() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageView, setPageView] = useState(0);

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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pageView,
        pageSize: 5,
      },
    },
  });

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
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-5 w-5 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                    >
                      <span className="sr-only">Copy</span>
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
              <div className="w-full">
                <div className="flex items-center py-4">
                  <Input
                    placeholder="Filter recipient..."
                    value={table.getColumn("recipient")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                      table
                        .getColumn("recipient")
                        ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                  />
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  {/* <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div> */}
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        table.previousPage();
                        setPageView(pageView - 1);
                      }}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        table.nextPage();
                        setPageView(pageView + 1);
                      }}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
