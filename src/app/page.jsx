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
    // <div className="flex flex-col items-center justify-center py-2">
    //   <h1>THIS IS THE HOME PAGE</h1>
    // </div>
    <>
      <div className="flex flex-col gap-[50px]">
        <div className="flex items-end justify-center h-[200px] gap-3 ">
          <div>
            <Input
              className="rounded-full w-[300px]"
              type="number"
              placeholder="enter reference tracking number"
              onWheel={(e) => e.target.blur()}
            ></Input>
          </div>
          <div>
            <Button className="rounded-full">
              <Search />
            </Button>
          </div>
        </div>

        <div className="flex justify-center" style={{ display: "none" }}>
          <Card className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%]">
            <CardHeader className="text-center font-extrabold text-4xl text-green-500">
              Welcome to Klaro Parcel Tracking System
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <Card className="w-full md:w-[33%] bg-green-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                <CardContent>
                  <p className="text-center font-bold text-lg text-black">
                    Receiver Features:
                  </p>

                  <p className="text-black font-bold">Track Parcel</p>
                  <p className="text-black">
                    Enter your reference tracking number to locate your parcel
                    and get real-time updates on its status, estimated arrival
                    time, and more.
                  </p>
                  <br></br>

                  <p className="text-black font-bold">Confirm Arrival</p>
                  <p className="text-black">
                    Receive notifications when your parcel arrives and easily
                    acknowledge its delivery for added convenience.
                  </p>
                  <br></br>

                  <p className="text-black font-bold">View Details</p>
                  <p className="text-black">
                    Gain access to comprehensive information about your parcels,
                    including current status, delivery data, estimated arrival
                    times, and detailed price breakdowns.
                  </p>
                  <br></br>
                </CardContent>
              </Card>
              <Card className="w-full md:w-[33%] bg-green-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                <CardContent>
                  <p className="text-center font-bold text-lg text-black">
                    Sender Features:
                  </p>

                  <p className="text-black font-bold">Input Parcel Data</p>
                  <p className="text-black">
                    Input neccessary details for sending parcels seamlessly.
                  </p>
                  <br></br>

                  <p className="text-black font-bold">View Order Status</p>
                  <p className="text-black">
                    Keep tabs on your orders sent out with updates on their
                    status on every delivery process
                  </p>
                  <br></br>

                  <p className="text-black font-bold">View Details</p>
                  <p className="text-black">
                    Gain access to comprehensive information about your parcels,
                    including current status, delivery dta, estimated arrival
                    times, and detailed price breakdowns.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full md:w-[33%] bg-green-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                <CardContent>
                  <p className="text-center font-bold text-lg text-black">
                    Delivery Features:
                  </p>

                  <p className="text-black font-bold">Statistics Report</p>
                  <p className="text-black">
                    Statistical report on delivered reports are reflected
                    through the software's utilization on data visualization
                    tools, underscoring analytical and technical
                    functionalities.
                  </p>
                  <br></br>

                  <p className="text-black font-bold">Manage Parcels</p>
                  <p className="text-black">
                    Keep Receivers informed by updating parcel status and
                    location. Seamlessly handle all aspects of parcel delivery
                    progress, ensuring smooth delivery operations from start to
                    finish. Our platforms empowers you to manage parcels with
                    ease, providing clear visibility into their status and
                    locations every step of the way.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center" /*style={{ display: "none" }}*/>
          <Card className="col-span-3 row-span-1 max-xl:row-span-2 h-[300px] w-[1500px]  max-xl:h-screen">
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
                    className={`h-16 w-16 my-2 disabled:opacity-100  bg-green-500 border-green-500 text-secondary"
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
                  <Label
                    htmlFor="option-center"
                    className="justify-self-center"
                  >
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
