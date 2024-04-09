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
import { useEffect, useState } from "react";
import { useParcels } from "../../api/useParcels";
import { useOrders } from "../../api/useOrders";
import { useDeliveryService } from "../../api/useDeliveryService";
import Loader from "./components/Loader";

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
  const [isMobile, setIsMobile] = useState(false);
  const {
    fetchDeliveryServiceParcels,
    // fetchSenderParcels,
    fetchParcel,
  } = useParcels();
  const { fetchOrder } = useOrders();
  const { getDeliveryServiceDocRef } = useDeliveryService();
  const [isLoading, setIsLoading] = useState(true);
  const [inTransit, setInTransit] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [returned, setReturned] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsData = [];

        const parcelsRef = await fetchDeliveryServiceParcels(
          await getDeliveryServiceDocRef(session?.user.email)
        );

        for (const parcelRef of parcelsRef) {
          const parcelSnapshot = await fetchParcel(parcelRef);

          if (parcelSnapshot.currentStatus === "In Transit") {
            setInTransit((prevState) => prevState + 1);
          }

          if (parcelSnapshot.currentStatus === "Delivered") {
            setDelivered((prevState) => prevState + 1);
          }

          if (parcelSnapshot.currentStatus === "Returned") {
            setReturned((prevState) => prevState + 1);
          }

          parcelsData.push(parcelSnapshot);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setIsLoading(true);
    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
    <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
      <div className="max-w-screen">
        <div className="grid grid-rows-4 grid-cols-3 gap-4">
          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">
                {!isLoading ? `${inTransit}` : <Loader big={true} />}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                In Transit
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">
                {!isLoading ? `${delivered}` : <Loader big={true} />}
              </CardTitle>

              <CardDescription className="text-lg max-md:text-base">
                Delivered
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">
                {!isLoading ? `${returned}` : <Loader big={true} />}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                Returned
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative row-span-3 col-span-3 max-xl:row-span-3 max-xl:col-span-3 z-10">
            <CardContent className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <BarChart
                data={chartdata}
                index="month"
                categories={["Number of parcels delivered"]}
                colors={["green"]}
                valueFormatter={dataFormatter}
                layout={isMobile ? "vertical" : "horizontal"}
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
