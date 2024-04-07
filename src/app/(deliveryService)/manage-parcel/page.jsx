"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import Loader from "../components/Loader";
const DeliveryStatus = dynamic(
  () =>
    import("../components/DeliveryStatus").then((mod) => mod.DeliveryStatus),
  {
    loading: () => (
      <Loader className="items-center justify-center" big={true} />
    ),
  }
);

const data = [
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
  },
  {
    rtn: 9529661493,
    receiverName: "Bea Caños",
    currentStatus: "In Transit",
    deliveryDate: "April 8, 2024 at 11:50:59 PM UTC+8",
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
    accessorKey: "receiverName",
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
    cell: ({ row }) => (
      <div className="pl-4">{row.getValue("receiverName")}</div>
    ),
  },
  {
    accessorKey: "currentStatus",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("currentStatus")}</div>
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
    cell: ({ row }) => {
      const deliveryDateObj = row.getValue("deliveryDate");
      if (!deliveryDateObj || typeof deliveryDateObj.seconds !== "number") {
        return <div className="pl-4">Invalid Date</div>;
      }
      const formattedDeliveryDate = new Date(deliveryDateObj.seconds * 1000);
      const formattedDeliveryDateString =
        formattedDeliveryDate.toLocaleDateString();

      return <div className="pl-4">{formattedDeliveryDateString}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const docRef = row.original;

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
              onClick={() => navigator.clipboard.writeText(docRef.rtn)}
            >
              Copy RTN
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ManageParcel() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageView, setPageView] = useState(0);

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pageView,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
        <div className="max-w-screen">
          <div className="grid grid-rows-5 grid-cols-5 max-xl:grid-rows-8 max-xl:grid-cols-1 gap-4">
            <Card className="row-span-5 col-span-2 max-xl:row-span-4 max-xl:col-span-1">
              <CardHeader>
                <CardTitle>Track a Package</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-4">
                  <Input type="number" id="rtn-input" placeholder="RTN" />
                  <Button>Track</Button>
                </div>

                <Separator className="my-3" />

                <DeliveryStatus />
              </CardContent>
            </Card>

            <Card className="row-span-5 col-span-3 max-xl:row-span-4 max-xl:col-span-1">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>1234 Orders</CardDescription>
              </CardHeader>
              <CardContent className="-mt-4">
                <div className="w-full">
                  <div className="flex items-center py-4">
                    <Input
                      placeholder="Search recipient"
                      value={
                        table.getColumn("receiverName")?.getFilterValue() ?? ""
                      }
                      onChange={(event) =>
                        table
                          .getColumn("receiverName")
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
                              {!isLoading ? (
                                "No results."
                              ) : (
                                <Loader className="items-center justify-center" />
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </>
  );
}
