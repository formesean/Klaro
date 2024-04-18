"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { senderExists } from "./api/useUsers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default async function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      if (session) {
        if (session.user.role === "deliveryService") {
          router.replace("/dashboard");
        } else if (session.user.role === "sender") {
          if (!(await senderExists(session.user.email))) {
            router.replace("/account");
          } else {
            router.replace("/dashboard");
          }
        }
      }
    }

    redirectUser();
  }, [session, router]);

  return (
    <>
      <div className="flex flex-col mx-auto px-10 py-16 gap-9">
        <div className="flex items-end justify-center gap-3">
          <Input
            className="rounded-full w-[350px] border-primary border-2"
            placeholder="enter reference tracking number"
            onWheel={(e) => e.target.blur()}
          />
          <Button className="rounded-full">
            <Search />
          </Button>
        </div>

        <Card className="hidden min-w-full">
          <CardHeader className="text-center font-extrabold text-4xl">
            Welcome to Klaro Parcel Tracking System
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
              <CardHeader className="text-center font-bold text-lg text-black">
                Receiver Features:
              </CardHeader>
              <CardContent className="flex flex-col justify-center items-center text-black gap-3">
                <div>
                  <p className="font-bold">Track Parcel</p>
                  <p className="text-justify">
                    Enter your reference tracking number to locate your parcel
                    and get real-time updates on its status, estimated arrival
                    time, and more.
                  </p>
                </div>

                <div>
                  <p className="font-bold">Confirm Arrival</p>
                  <p className="text-justify">
                    Receive notifications when your parcel arrives and easily
                    acknowledge its delivery for added convenience.
                  </p>
                </div>

                <div>
                  <p className="font-bold">View Details</p>
                  <p className="text-justify">
                    Gain access to comprehensive information about your parcels,
                    including current status, delivery data, estimated arrival
                    times, and detailed price breakdowns.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
              <CardHeader className="text-center font-bold text-lg text-black">
                Sender Features:
              </CardHeader>
              <CardContent className="flex flex-col justify-center items-center text-black gap-9">
                <div>
                  <p className="font-bold">Input Parcel Data</p>
                  <p className="text-justify">
                    Input neccessary details for sending parcels seamlessly.
                  </p>
                </div>

                <div>
                  <p className="font-bold">View Order Status</p>
                  <p className="text-justify">
                    Keep tabs on your orders sent out with updates on their
                    status on every delivery process
                  </p>
                </div>

                <div>
                  <p className=" font-bold">View Details</p>
                  <p className="text-justify">
                    Gain access to comprehensive information about your parcels,
                    including current status, delivery dta, estimated arrival
                    times, and detailed price breakdowns.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
              <CardHeader className="text-center font-bold text-lg text-black">
                Delivery Features:
              </CardHeader>
              <CardContent className="flex flex-col justify-center items-center text-black gap-3">
                <div>
                  <p className=" font-bold">Statistics Report</p>
                  <p className="text-justify">
                    Statistical report on delivered reports are reflected
                    through the software&apos;s utilization on data
                    visualization tools, underscoring analytical and technical
                    functionalities.
                  </p>
                </div>

                <div>
                  <p className=" font-bold">Manage Parcels</p>
                  <p className="text-justify">
                    Keep Receivers informed by updating parcel status and
                    location. Seamlessly handle all aspects of parcel delivery
                    progress, ensuring smooth delivery operations from start to
                    finish. Our platforms empowers you to manage parcels with
                    ease, providing clear visibility into their status and
                    locations every step of the way.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="min-w-full col-span-3 row-span-1 max-xl:row-span-2">
          <CardHeader>
            <CardTitle>Parcel Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <RadioGroup
              disabled
              className="flex flex-row max-lg:flex-col justify-evenly max-lg:gap-5"
              // defaultValue={
              //   details.currentStatus === "Order Placed"
              //     ? "option-order"
              //     : details.currentStatus === "Arrived at Sort Center"
              //     ? "option-center"
              //     : details.currentStatus === "In Transit"
              //     ? "option-intransit"
              //     : details.currentStatus === "Arrived at the Logistics Hub"
              //     ? "option-hub"
              //     : details.currentStatus === "Delivered"
              //     ? "option-delivered"
              //     : ""
              // }
            >
              <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                <RadioGroupItemWithIcons
                  value="option-order"
                  id="option-order"
                  selected={"option-order"}
                  className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white border-green-500 text-secondary"
                        : "border-border"
                    }`}
                />
                <Label htmlFor="option-order" className="justify-self-center">
                  <div className="flex flex-col justify-center pl-2">
                    <h1 className="font-bold text-base border-slate-600">
                      Order Placed
                    </h1>
                    <p className="text-[#ffffffdb] text-sm">
                      Ready for pick up
                    </p>
                    <p className="text-sm text-[#808080]">mm/dd/yy</p>
                  </div>
                </Label>
              </div>

              <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                <RadioGroupItemWithIcons
                  value="option-center"
                  id="option-center"
                  selected="option-center"
                  className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-green-500 text-secondary"
                    : "border-border"
                }`}
                />
                <Label htmlFor="option-center" className="justify-self-center">
                  <div className="flex flex-col justify-center pl-2">
                    <h1 className="font-bold text-base border-slate-600">
                      Arrived at Sort Center
                    </h1>
                    <p className="text-[#ffffffdb] text-sm">
                      <span className="block">Logistics Facility:</span>{" "}
                      {/* {details.centerLocation} */}
                    </p>
                    <p className="text-sm text-[#808080]">mm/dd/yy</p>
                  </div>
                </Label>
              </div>

              <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                <RadioGroupItemWithIcons
                  value="option-intransit"
                  id="option-intransit"
                  selected="option-intransit"
                  className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-green-500 text-secondary"
                        : "border-border"
                    }`}
                />
                <Label
                  htmlFor="option-intransit"
                  className="justify-self-center"
                >
                  <div className="flex flex-col justify-center pl-2">
                    <h1 className="font-bold text-base border-slate-600">
                      In Transit
                    </h1>
                    <p className="text-[#ffffffdb] text-sm">
                      On its way to the next logistics facility
                    </p>
                    <p className="text-sm text-[#808080]">mm/dd/yy</p>
                  </div>
                </Label>
              </div>

              <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                <RadioGroupItemWithIcons
                  value="option-hub"
                  id="option-hub"
                  selected="option-hub"
                  className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-green-500 text-secondary"
                        : "border-border"
                    }`}
                />
                <Label htmlFor="option-hub" className="justify-self-center">
                  <div className="flex flex-col justify-center pl-2">
                    <h1 className="font-bold text-base border-slate-600">
                      Arrived at the Logistics Hub
                    </h1>
                    <p className="text-[#ffffffdb] text-sm">
                      <span className="block">Logistics Facility:</span>{" "}
                    </p>
                    <p className="text-sm text-[#808080]">mm/dd/yy</p>
                  </div>
                </Label>
              </div>

              <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                <RadioGroupItemWithIcons
                  value="option-delivered"
                  id="option-delivered"
                  selected="option-delivered"
                  className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-green-500 text-secondary"
                        : "border-border"
                    }`}
                />
                <Label
                  htmlFor="option-delivered"
                  className="justify-self-center"
                >
                  <div className="flex flex-col justify-center pl-2">
                    <h1 className="font-bold text-base border-slate-600">
                      Delivered
                    </h1>
                    <p className="text-[#ffffffdb] text-sm">
                      Parcel has been delivered
                    </p>
                    <p className="text-sm text-[#808080]">mm/dd/yy</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {true ? (
              <div className="flex gap-3 justify-center items-center">
                <div className="flex-grow">
                  <Separator />
                </div>
                <Button>Confirm Delivery</Button>
                <div className="flex-grow">
                  <Separator />
                </div>
              </div>
            ) : (
              <Separator />
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference Tracking Number</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Delivery Service</TableHead>
                  <TableHead>Tracking Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>12345678901</TableCell>
                  <TableCell>Cebu, Philippines</TableCell>
                  <TableCell>Cebu, Philippines</TableCell>
                  <TableCell>SKA Express</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* <Label htmlFor="link" className="sr-only">
                          Link
                        </Label> */}
                      <Input
                        className="w-40 h-8"
                        id="link"
                        value="https://klaro.vercel.app/" // should have a search param
                        readOnly
                      />
                      <Button variant="secondary" className="text-sm h-8 w-12">
                        Copy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
