"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { senderExists } from "./api/useUsers";
import {
  Card,
  CardContent,
  CardFooter,
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
      <div className="flex flex-col mx-auto px-10 pt-16 max-lg:py-16 gap-12">
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

        {false ? (
          <Card className="min-w-full">
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
                      Gain access to comprehensive information about your
                      parcels, including current status, delivery data,
                      estimated arrival times, and detailed price breakdowns.
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
                      Gain access to comprehensive information about your
                      parcels, including current status, delivery dta, estimated
                      arrival times, and detailed price breakdowns.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                <CardHeader className="text-center font-bold text-lg text-black">
                  Delivery Features:
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center text-black gap-10">
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
                      Keep recipients informed with real-time updates on parcel
                      status and location. Our platform ensures seamless
                      management of parcel delivery progress, providing clear
                      visibility from start to finish.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : (
          <Card className="min-w-full col-span-3 row-span-1 max-xl:row-span-2 px-10 py-14">
            <CardContent className="overflow-auto grid grid-cols-2 items-center pb-0 max-lg:flex max-lg:flex-col max-lg:gap-10">
              <div className="relative w-full h-[417px] max-sm:h-[430px] overflow-auto">
                <RadioGroup
                  className="w-full"
                  disabled
                  defaultValue={
                    // details.currentStatus === "Order Placed"
                    //   ? "option-order"
                    //   : details.currentStatus === "Arrived at Sort Center"
                    //   ? "option-center"
                    //   : details.currentStatus === "In Transit"
                    //   ? "option-intransit"
                    //   : details.currentStatus === "Arrived at the Logistics Hub"
                    //   ? "option-hub"
                    //   : details.currentStatus === "Delivered"
                    //   ?
                    "option-delivered"
                    // : ""
                  }
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <RadioGroupItemWithIcons
                        value="option-delivered"
                        id="option-delivered"
                        selected="option-delivered"
                        className={`w-16 h-16 disabled:opacity-100 ${
                          // details.currentStatus === "Delivered"
                          //   ?
                          "bg-green-500 border-green-500 text-secondary"
                          // : "border-border"
                        }`}
                      />
                      <Label htmlFor="option-delivered">
                        <div className="flex flex-col justify-center pl-2">
                          <div className="flex justify-start items-center gap-4">
                            <h1 className="font-bold text-base">Delivered</h1>
                            <p className="text-sm text-[#808080]">
                              4/20/2024
                              {/* {details.deliveryDate.toLocaleDateString()} */}
                            </p>
                          </div>
                          <p className="text-[#ffffffdb]">
                            Parcel has been delivered
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <Separator
                      orientation="vertical"
                      className={`h-6 w-[5px] ml-[30px] -my-2 ${
                        // details.currentStatus === "Delivered"
                        //   ?
                        "bg-green-500"
                        // : "border-border"
                      }`}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <RadioGroupItemWithIcons
                        value="option-hub"
                        id="option-hub"
                        selected="option-hub"
                        className={`w-16 h-16 disabled:opacity-100 ${
                          // details.currentStatus === "Arrived at the Logistics Hub" ||
                          // details.currentStatus === "Delivered"
                          //   ?
                          "bg-green-500 border-green-500 text-secondary"
                          // : "border-border"
                        }`}
                      />
                      <Label htmlFor="option-hub">
                        <div className="flex flex-col justify-center pl-2">
                          <div className="flex justify-start items-center gap-4">
                            <h1 className="font-bold text-base max-md:leading-4">
                              Arrived at the Logistics Hub
                            </h1>
                            <p className="text-sm text-[#808080]">
                              4/13/2024
                              {/* {details?.hubDate !== null
                  ? details?.hubDate?.toLocaleDateString()
                  : ""} */}
                            </p>
                          </div>
                          <p className="text-[#ffffffdb]">
                            Logistics Facility: Cebu
                            {/* {details.hubLocation} */}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <Separator
                      orientation="vertical"
                      className={`h-6 w-[5px] ml-[30px] -my-2 ${
                        // details.currentStatus === "Arrived at the Logistics Hub" ||
                        // details.currentStatus === "Delivered"
                        //   ?
                        "bg-green-500"
                        // : "border-border"
                      }`}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <RadioGroupItemWithIcons
                        value="option-intransit"
                        id="option-intransit"
                        selected="option-intransit"
                        className={`w-16 h-16 disabled:opacity-100 ${
                          // details.currentStatus === "In Transit" ||
                          // details.currentStatus === "Arrived at the Logistics Hub" ||
                          // details.currentStatus === "Delivered"
                          //   ?
                          "bg-green-500 border-green-500 text-secondary"
                          // : "border-border"
                        }`}
                      />
                      <Label htmlFor="option-intransit">
                        <div className="flex flex-col justify-center pl-2">
                          <div className="flex justify-start items-center gap-4">
                            <h1 className="font-bold text-base border-slate-600">
                              In Transit
                            </h1>
                            <p className="text-sm text-[#808080]">
                              4/13/2024
                              {/* {details?.inTransitDate !== null
                  ? details?.inTransitDate?.toLocaleDateString()
                  : ""} */}
                            </p>
                          </div>
                          <p className="text-[#ffffffdb]">
                            On its way to the next logistics facility
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <Separator
                      orientation="vertical"
                      className={`h-6 w-[5px] ml-[30px] -my-2 ${
                        // details.currentStatus === "In Transit" ||
                        // details.currentStatus === "Arrived at the Logistics Hub" ||
                        // details.currentStatus === "Delivered"
                        //   ?
                        "bg-green-500"
                        // : "border-border"
                      }`}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <RadioGroupItemWithIcons
                        value="option-center"
                        id="option-center"
                        selected="option-center"
                        className={`w-16 h-16 disabled:opacity-100 ${
                          // details.currentStatus === "Arrived at Sort Center" ||
                          // details.currentStatus === "In Transit" ||
                          // details.currentStatus === "Arrived at the Logistics Hub" ||
                          // details.currentStatus === "Delivered"
                          // ?
                          "bg-green-500 border-green-500 text-secondary"
                          // : "border-border"
                        }`}
                      />
                      <Label htmlFor="option-center">
                        <div className="flex flex-col justify-center pl-2">
                          <div className="flex justify-start items-center gap-4">
                            <h1 className="font-bold text-base max-md:leading-4">
                              Arrived at Sort Center
                            </h1>
                            <p className="text-sm text-[#808080]">
                              4/13/2024
                              {/* {details?.centerDate !== null
                        ? details?.centerDate?.toLocaleDateString() 
                      :
                        ""} */}
                            </p>
                          </div>
                          <p className="text-[#ffffffdb]">
                            Logistics Facility: Poblacion, Asturias, Cebu
                            {/* {details.centerLocation} */}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <Separator
                      orientation="vertical"
                      className={`h-6 w-[5px] ml-[30px] -my-2 ${
                        // details.currentStatus === "Arrived at Sort Center" ||
                        // details.currentStatus === "In Transit" ||
                        // details.currentStatus === "Arrived at the Logistics Hub" ||
                        // details.currentStatus === "Delivered"
                        // ?
                        "bg-green-500"
                        // : "border-border"
                      }`}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <RadioGroupItemWithIcons
                        value="option-order"
                        id="option-order"
                        selected="option-order"
                        className={`w-16 h-16 disabled:opacity-100 ${
                          // details.currentStatus === "Order Placed" ||
                          // details.currentStatus === "Arrived at Sort Center" ||
                          // details.currentStatus === "In Transit" ||
                          // details.currentStatus === "Arrived at the Logistics Hub" ||
                          // details.currentStatus === "Delivered"
                          // ?
                          "bg-green-500 border-green-500 text-secondary"
                          // : "border-border"
                        }`}
                      />
                      <div className="flex items-center gap-10">
                        <Label htmlFor="option-order">
                          <div className="flex flex-col justify-center pl-2">
                            <div className="flex justify-center items-center gap-4">
                              <h1 className="font-bold text-base max-md:leading-4">
                                Order Placed
                              </h1>
                              <p className="text-sm text-[#808080]">
                                {/* {details.orderPlacedDate.toLocaleDateString()} */}
                              </p>
                            </div>
                            <p className="text-[#ffffffdb]">
                              Ready for pick-up
                            </p>
                          </div>
                        </Label>
                        <Button>Confirm Delivery</Button>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead>Reference Tracking Number</TableHead>
                    <TableCell>12345678901</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Origin</TableHead>
                    <TableCell>Cebu, Philippines</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Destination</TableHead>
                    <TableCell>Cebu, Philippines</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Delivery Service</TableHead>
                    <TableCell>SKA Express</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Tracking Link</TableHead>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Input
                          className="w-40 h-8"
                          id="link"
                          value="https://klaro.vercel.app/" // should have a search param
                          readOnly
                        />
                        <Button
                          variant="secondary"
                          className="text-sm h-8 w-12"
                        >
                          Copy
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
