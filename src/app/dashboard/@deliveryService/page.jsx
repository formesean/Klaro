"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BarChart } from "@tremor/react";

const chartdata = [
  {
    month: "Jan",
    "Number of parcels delivered": 20,
  },
  {
    month: "Feb",
    "Number of parcels delivered": 10,
  },
  {
    month: "Mar",
    "Number of parcels delivered": 5,
  },
  {
    month: "Apr",
    "Number of parcels delivered": 3,
  },
  {
    month: "May",
    "Number of parcels delivered": 7,
  },
  {
    month: "Jun",
    "Number of parcels delivered": 8,
  },
  {
    month: "Jul",
    "Number of parcels delivered": 9,
  },
  {
    month: "Aug",
    "Number of parcels delivered": 12,
  },
  {
    month: "Sept",
    "Number of parcels delivered": 6,
  },
  {
    month: "Oct",
    "Number of parcels delivered": 9,
  },
  {
    month: "Nov",
    "Number of parcels delivered": 23,
  },
  {
    month: "Dec",
    "Number of parcels delivered": 3,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
    <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
      <div className="max-w-screen">
        <div className="grid grid-rows-5 grid-cols-3 max-xl:grid-rows-9 max-xl:grid-cols-3 gap-4">
          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">0</CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                In Transit
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">0</CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                Delivered
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">0</CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                Returned
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative row-span-4 col-span-3 max-xl:row-span-4 max-xl:col-span-3 z-10">
            <CardContent className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <BarChart
                data={chartdata}
                index="month"
                categories={["Number of parcels delivered"]}
                colors={["green"]}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
                onValueChange={(v) => console.log(v)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
