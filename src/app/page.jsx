"use client";
import { useState, useEffect } from "react";
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
import { Check, Copy, Search } from "lucide-react";
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
import { useParcels } from "../app/api/useParcels";
import { useOrders } from "../app/api/useOrders";
import { useDeliveryService } from "../app/api/useDeliveryService";
import { useSearchParams } from "next/navigation";
import Loader from "./loading";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [details, setDetails] = useState({
    currentStatus: "",
    hubLocation: "",
    centerLocation: "",
    orderPlacedDate: null,
    centerDate: null,
    inTransitDate: null,
    hubDate: null,
    deliveryDate: null,
    received: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showParcelDetails, setShowParcelDetails] = useState(false);
  const [parcelData, setParcelData] = useState();
  const [orderData, setOrderData] = useState();
  const [deliveryServiceData, setDeliveryService] = useState();
  const { fetchDeliveryService } = useDeliveryService();
  const { fetchParcel, fetchParcelByRTN, updateParcel } = useParcels();
  const { fetchOrder } = useOrders();
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const searchRTN = searchParams.get("rtn");
  const [parcelRef, setParcelRef] = useState();
  const [invalidRTN, setInvalidRTN] = useState(false);

  useEffect(() => {
    const checkUserRoleAndRedirect = async () => {
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
    };

    checkUserRoleAndRedirect();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchRTN) {
        await queryDatabase(searchRTN);
        setShowParcelDetails(true);
      } else {
        setShowParcelDetails(false);
      }
    };

    fetchData();
  }, [searchRTN]);

  const queryDatabase = async (rtnInput) => {
    setIsLoading(true);
    const parcelRef = await fetchParcelByRTN(rtnInput);

    if (parcelRef) {
      setInvalidRTN(false);
    } else {
      setIsLoading(false);
      setInvalidRTN(true);
      return;
    }

    const parcelData = await fetchParcel(parcelRef);
    const orderData = await fetchOrder(parcelData.orderRef);
    setParcelRef(parcelRef);

    const deliveryServiceData = await fetchDeliveryService(
      orderData.deliveryService
    );

    setParcelData(parcelData);
    setOrderData(orderData);
    setDeliveryService(deliveryServiceData);

    const hubLocation = orderData.receiverAddress
      .split(",")
      .slice(1)
      .join(",")
      .trim();
    const centerLocation = orderData.senderAddress
      .split(",")
      .slice(1)
      .join(",")
      .trim();

    const orderPlacedDate = new Date(orderData.dateIssued.seconds * 1000);
    const centerDate =
      parcelData.centerDate === undefined
        ? null
        : new Date(parcelData.centerDate?.seconds * 1000);
    const inTransitDate =
      parcelData.inTransitDate === undefined
        ? null
        : new Date(parcelData.inTransitDate?.seconds * 1000);
    const hubDate =
      parcelData.hubDate === undefined
        ? null
        : new Date(parcelData.hubDate?.seconds * 1000);
    const deliveryDate = new Date(parcelData.deliveryDate.seconds * 1000);

    setDetails({
      currentStatus: parcelData.currentStatus,
      hubLocation: hubLocation,
      centerLocation: centerLocation,
      orderPlacedDate: orderPlacedDate,
      centerDate: centerDate,
      inTransitDate: inTransitDate,
      hubDate: hubDate,
      deliveryDate: deliveryDate,
      received: parcelData.received,
    });

    setIsLoading(false);
  };

  const handleSearchSubmit = () => {
    setShowParcelDetails(false);
    const rtnInput = document.getElementById("rtn-input").value.trim();

    if (rtnInput) {
      queryDatabase(rtnInput);
      setShowParcelDetails(true);

      const url = new URL(window.location.href);
      url.searchParams.set("rtn", rtnInput);
      window.history.pushState({ path: url.href }, "", url.href);
    } else {
      setInvalidRTN(false);
      setShowParcelDetails(false);

      const url = new URL(window.location.href);
      url.searchParams.delete("rtn");
      window.history.pushState({ path: url.href }, "", url.href);
    }
  };

  const copyLink = () => {
    const textToCopy = document.getElementById("link").value;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleConfirmDelivery = async () => {
    try {
      const updatedData = { received: true };
      await updateParcel(parcelRef, updatedData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto px-10 pt-16 max-lg:py-16 gap-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <Input
              className={`rounded-full w-[350px] border-primary border-2 ${
                invalidRTN && "border-red-600"
              }`}
              placeholder="enter reference tracking number"
              id="rtn-input"
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
            />
            <Button
              onClick={handleSearchSubmit}
              className={`rounded-full ${invalidRTN && "bg-red-600"}`}
            >
              <Search />
            </Button>
          </div>
          {invalidRTN && (
            <Label className="text-red-600">
              Invalid RTN! Please try again.
            </Label>
          )}
        </div>

        {!isLoading ? (
          !showParcelDetails || invalidRTN ? (
            <Card className="min-w-full">
              <CardHeader className="text-center font-extrabold text-4xl">
                Welcome to Klaro Parcel Tracking System
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6">
                <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                  <CardHeader className="text-center font-bold text-lg text-black">
                    Receiver Features:
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center text-black gap-3">
                    <div>
                      <p className="font-bold">Track Parcel</p>
                      <p className="text-justify">
                        Enter your reference tracking number to locate your
                        parcel and get real-time updates on its status,
                        estimated arrival time, and more.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold">Confirm Arrival</p>
                      <p className="text-justify">
                        Receive notifications when your parcel arrives and
                        easily acknowledge its delivery for added convenience.
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
                  <CardContent className="flex flex-col justify-center text-black gap-9">
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
                        parcels, including current status, delivery dta,
                        estimated arrival times, and detailed price breakdowns.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-full md:w-[33%] bg-green-500 border-2 border-transparent hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-500 rounded-tl-[35px] rounded-br-[35px] shadow-2xl">
                  <CardHeader className="text-center font-bold text-lg text-black">
                    Delivery Features:
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center text-black gap-10">
                    <div>
                      <p className=" font-bold">Statistics Report</p>
                      <p className="text-justify">
                        Statistical report on delivered reports are reflected
                        through the software&apos;s utilization on data
                        visualization tools, underscoring analytical and
                        technical functionalities.
                      </p>
                    </div>

                    <div>
                      <p className=" font-bold">Manage Parcels</p>
                      <p className="text-justify">
                        Keep recipients informed with real-time updates on
                        parcel status and location. Our platform ensures
                        seamless management of parcel delivery progress,
                        providing clear visibility from start to finish.
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
                      details.currentStatus === "Order Placed"
                        ? "option-order"
                        : details.currentStatus === "Arrived at Sort Center"
                        ? "option-center"
                        : details.currentStatus === "In Transit"
                        ? "option-intransit"
                        : details.currentStatus ===
                          "Arrived at the Logistics Hub"
                        ? "option-hub"
                        : details.currentStatus === "Delivered"
                        ? "option-delivered"
                        : ""
                    }
                  >
                    <div className="flex items-center space-x-2 gap-5">
                      <div className="flex items-center">
                        <RadioGroupItemWithIcons
                          value="option-delivered"
                          id="option-delivered"
                          selected="option-delivered"
                          className={`w-16 h-16 disabled:opacity-100 ${
                            details.currentStatus === "Delivered"
                              ? "bg-green-500 border-green-500 text-secondary"
                              : "border-border"
                          }`}
                        />
                        <Label htmlFor="option-delivered">
                          <div className="flex flex-col justify-center pl-2">
                            <div className="flex justify-start items-center gap-4">
                              <h1 className="font-bold text-base">Delivered</h1>
                              <p className="text-sm text-[#808080]">
                                {details.deliveryDate
                                  ? details.deliveryDate.toLocaleDateString()
                                  : ""}
                              </p>
                            </div>
                            <p className="text-[#ffffffdb]">
                              Parcel has been delivered
                            </p>
                          </div>
                        </Label>
                      </div>
                      {details.currentStatus === "Delivered" && (
                        <Button
                          disabled={details.received}
                          onClick={handleConfirmDelivery}
                        >
                          {!details.received
                            ? "Confirm Delivery"
                            : "Confirmed Delivery"}
                        </Button>
                      )}
                    </div>

                    <div className="flex-grow">
                      <Separator
                        orientation="vertical"
                        className={`h-6 w-[5px] ml-[30px] -my-2 ${
                          details.currentStatus === "Delivered"
                            ? "bg-green-500"
                            : "border-border"
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
                            details.currentStatus ===
                              "Arrived at the Logistics Hub" ||
                            details.currentStatus === "Delivered"
                              ? "bg-green-500 border-green-500 text-secondary"
                              : "border-border"
                          }`}
                        />
                        <Label htmlFor="option-hub">
                          <div className="flex flex-col justify-center pl-2">
                            <div className="flex justify-start items-center gap-4">
                              <h1 className="font-bold text-base max-md:leading-4">
                                Arrived at the Logistics Hub
                              </h1>
                              <p className="text-sm text-[#808080]">
                                {details?.hubDate !== null
                                  ? details?.hubDate?.toLocaleDateString()
                                  : ""}
                              </p>
                            </div>
                            <p className="text-[#ffffffdb]">
                              Logistics Facility: {details.hubLocation}
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <Separator
                        orientation="vertical"
                        className={`h-6 w-[5px] ml-[30px] -my-2 ${
                          details.currentStatus ===
                            "Arrived at the Logistics Hub" ||
                          details.currentStatus === "Delivered"
                            ? "bg-green-500"
                            : "border-border"
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
                            details.currentStatus === "In Transit" ||
                            details.currentStatus ===
                              "Arrived at the Logistics Hub" ||
                            details.currentStatus === "Delivered"
                              ? "bg-green-500 border-green-500 text-secondary"
                              : "border-border"
                          }`}
                        />
                        <Label htmlFor="option-intransit">
                          <div className="flex flex-col justify-center pl-2">
                            <div className="flex justify-start items-center gap-4">
                              <h1 className="font-bold text-base border-slate-600">
                                In Transit
                              </h1>
                              <p className="text-sm text-[#808080]">
                                {details?.inTransitDate !== null
                                  ? details?.inTransitDate?.toLocaleDateString()
                                  : ""}
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
                          details.currentStatus === "In Transit" ||
                          details.currentStatus ===
                            "Arrived at the Logistics Hub" ||
                          details.currentStatus === "Delivered"
                            ? "bg-green-500"
                            : "border-border"
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
                            details.currentStatus ===
                              "Arrived at Sort Center" ||
                            details.currentStatus === "In Transit" ||
                            details.currentStatus ===
                              "Arrived at the Logistics Hub" ||
                            details.currentStatus === "Delivered"
                              ? "bg-green-500 border-green-500 text-secondary"
                              : "border-border"
                          }`}
                        />
                        <Label htmlFor="option-center">
                          <div className="flex flex-col justify-center pl-2">
                            <div className="flex justify-start items-center gap-4">
                              <h1 className="font-bold text-base max-md:leading-4">
                                Arrived at Sort Center
                              </h1>
                              <p className="text-sm text-[#808080]">
                                {details?.centerDate !== null
                                  ? details?.centerDate?.toLocaleDateString()
                                  : ""}
                              </p>
                            </div>
                            <p className="text-[#ffffffdb]">
                              Logistics Facility: {details.centerLocation}
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <Separator
                        orientation="vertical"
                        className={`h-6 w-[5px] ml-[30px] -my-2 ${
                          details.currentStatus === "Arrived at Sort Center" ||
                          details.currentStatus === "In Transit" ||
                          details.currentStatus ===
                            "Arrived at the Logistics Hub" ||
                          details.currentStatus === "Delivered"
                            ? "bg-green-500"
                            : "border-border"
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
                            details.currentStatus === "Order Placed" ||
                            details.currentStatus ===
                              "Arrived at Sort Center" ||
                            details.currentStatus === "In Transit" ||
                            details.currentStatus ===
                              "Arrived at the Logistics Hub" ||
                            details.currentStatus === "Delivered"
                              ? "bg-green-500 border-green-500 text-secondary"
                              : "border-border"
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
                                  {details.orderPlacedDate
                                    ? details.orderPlacedDate.toLocaleDateString()
                                    : ""}
                                </p>
                              </div>
                              <p className="text-[#ffffffdb]">
                                Ready for pick-up
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Reference Tracking Number</TableHead>
                      <TableCell>{parcelData?.rtn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Origin</TableHead>
                      <TableCell>{orderData?.senderAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Destination</TableHead>
                      <TableCell>{orderData?.receiverAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Delivery Service</TableHead>
                      <TableCell>{deliveryServiceData?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Tracking Link</TableHead>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Input
                            className="w-40 h-8"
                            id="link"
                            value={`https://klaro.vercel.app/?rtn=${searchRTN}`}
                            readOnly
                          />
                          <button
                            onClick={copyLink}
                            disabled={copied}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-7 w-7 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                          >
                            {copied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )
        ) : (
          <Loader big={true} />
        )}
      </div>
    </>
  );
}
