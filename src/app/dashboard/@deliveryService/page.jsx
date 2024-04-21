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
import { useDeliveryService } from "../../api/useDeliveryService";
import Loader from "./components/Loader";

export default function Dashboard() {
  const { data: session } = useSession();
  const { fetchDeliveryServiceParcels, fetchParcel } = useParcels();
  const { getDeliveryServiceDocRef } = useDeliveryService();
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState({
    inTransit: 0,
    delivered: 0,
    returned: 0,
  });
  const [months, setMonths] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsData = [];
        const updatedMonths = { ...months };
        const updatedStats = { ...stat };

        const parcelsRef = await fetchDeliveryServiceParcels(
          await getDeliveryServiceDocRef(session?.user.email)
        );

        for (const parcelRef of parcelsRef) {
          const parcelSnapshot = await fetchParcel(parcelRef);

          switch (parcelSnapshot.currentStatus) {
            case "In Transit":
              updatedStats.inTransit++;
              break;
            case "Delivered":
              updatedStats.delivered++;
              const month = parcelSnapshot.deliveryDate.toDate().getMonth();
              updatedMonths[Object.keys(updatedMonths)[month]]++;
              break;
            case "Returned":
              updatedStats.returned++;
              break;
            default:
              break;
          }

          parcelsData.push(parcelSnapshot);
        }

        setStat(updatedStats);
        setMonths(updatedMonths);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  const monthData = Object.entries(months).map(([month, count]) => ({
    month,
    "Number of parcels delivered": count,
  }));

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
                {!isLoading ? `${stat.inTransit}` : <Loader big={true} />}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                In Transit
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">
                {!isLoading ? `${stat.delivered}` : <Loader big={true} />}
              </CardTitle>

              <CardDescription className="text-lg max-md:text-base">
                Delivered
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="row-span-1 col-span-1 max-xl:row-span-1 max-xl:col-span-1">
            <CardHeader className="max-md:p-2">
              <CardTitle className="text-4xl">
                {!isLoading ? `${stat.returned}` : <Loader big={true} />}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                Returned
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative row-span-3 col-span-3 max-xl:row-span-3 max-xl:col-span-3 z-10">
            <CardContent className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <BarChart
                data={monthData}
                index="month"
                categories={["Number of parcels delivered"]}
                colors={["green"]}
                yAxisWidth={48}
                showXAxis={true}
                onValueChange={(v) => console.log(v)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
