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
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useEffect, useState } from "react";
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
const ViewDetails = dynamic(
  () => import("../components/ViewDetails").then((mod) => mod.ViewDetails),
  {
    loading: () => <Loader className="items-center justify-center" />,
  }
);

export default function ManageParcel() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <>
      <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
        <div className="max-w-screen">
          <div className="grid grid-rows-5 grid-cols-5 max-xl:grid-rows-9 max-xl:grid-cols-3 gap-4">
            <Card className="row-span-5 col-span-2 max-xl:row-span-4 max-xl:col-span-3">
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

            <Card className="row-span-4 col-span-3 max-xl:row-span-4 max-xl:col-span-3">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>1234 Orders</CardDescription>
              </CardHeader>
              <CardContent className="-mt-4"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
