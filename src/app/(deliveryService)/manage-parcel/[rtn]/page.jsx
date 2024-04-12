"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../../components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { useEffect, useState } from "react";
import { useItems } from "../../../api/useItems";
import { useOrders } from "../../../api/useOrders";
import { useParcels } from "../../../api/useParcels";
import Loader from "../../components/Loader";
import { Timestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default function UpdateParcel({ params }) {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const { fetchParcelByRTN, fetchParcel, updateParcel } = useParcels();
  const { fetchOrder } = useOrders();
  const { fetchItem } = useItems();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [deliveryService, setDeliveryService] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [parcelRef, setParcelRef] = useState();
  const [details, setDetails] = useState({
    currentStatus: "",
    hubLocation: "",
    centerLocation: "",
    orderPlacedDate: null,
    centerDate: null,
    inTransitDate: null,
    hubDate: null,
  });
  const [status, setStatus] = useState();
  const [merchandiseSubtotal, setMerchandiseSubtotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [hubDate, setHubDate] = useState();
  const [inTransitDate, setInTransitDate] = useState();
  const [centerDate, setCenterDate] = useState();
  const [deliveryDate, setDeliveryDate] = useState();

  useEffect(() => {
    setIsClient(true);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const parcelsRef = await fetchParcelByRTN(params.rtn);
        const parcelData = await fetchParcel(parcelsRef);
        const orderData = await fetchOrder(parcelData.orderRef);
        setParcelRef(parcelsRef);

        if (parcelsRef) {
          const parcelDetail = await fetchParcel(parcelsRef);
          const orderDetail = await fetchOrder(parcelDetail.orderRef);
          const deliveryServiceDetail = await fetchOrder(
            orderDetail.deliveryService
          );

          const itemData = [];
          for (const itemReference of orderDetail.items) {
            const itemSnapshot = await fetchItem(itemReference);
            itemData.push(itemSnapshot);
          }

          setItemsData(itemData);
          setOrders(orderDetail);
          setDeliveryService(deliveryServiceDetail);
          setMerchandiseSubtotal(orderData.totalPrice - orderData.shippingFee);
          setShippingTotal(orderData.shippingFee);
          setTotalPayment(orderData.totalPrice);
        }

        const hubLocation = orderData.receiverAddress
          .split(",")
          .slice(1)
          .join(",")
          .trim();

        const centerLocation = orderData.receiverAddress
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

        setDetails({
          currentStatus: parcelData.currentStatus,
          hubLocation: hubLocation,
          centerLocation: centerLocation,
          orderPlacedDate: orderPlacedDate,
          centerDate: centerDate,
          inTransitDate: inTransitDate,
          hubDate: hubDate,
        });

        const deliveryDate = new Date(parcelData.deliveryDate.seconds * 1000);

        setDeliveryDate(deliveryDate);
        setIsLoading(false);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
    setStatus(details.currentStatus);
    setIsLoading(true);
  }, []);

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  const handleChange = (status) => {
    setStatus(status);
    const timestamp = Timestamp.now();
    const timestampString = new Date(timestamp.seconds * 1000);

    if (status == "Arrived at Sort Center") {
      setCenterDate(timestampString);
    }

    if (status == "In Transit") {
      setInTransitDate(timestampString);
    }

    if (status == "Arrived at the Logistics Hub") {
      setHubDate(timestampString);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const updatedData = { currentStatus: status };

      if (centerDate !== undefined) updatedData.centerDate = centerDate;
      if (inTransitDate !== undefined)
        updatedData.inTransitDate = inTransitDate;
      if (hubDate !== undefined) updatedData.hubDate = hubDate;

      if (status !== "Delivered") {
        await updateParcel(parcelRef, updatedData);
      }

      let subject = "";
      if (status === "Arrived at Sort Center") {
        subject = `Your order ${params.rtn} has Arrived at Sort Center`;
      } else if (status === "In Transit") {
        subject = `Your order ${params.rtn} is now In Transit`;
      } else if (status === "Arrived at the Logistics Hub") {
        subject = `Your order ${params.rtn} has Arrived at the Logistics Hub`;
      }

      const emailParams = {
        subject,
        message: `Hello ${orders.receiverName},\n${subject}`,
        deliveryServiceName: deliveryService.name,
        items: itemsData.map((item) => item.itemName).join(", "),
        totalAmount: totalPayment,
        to_email: orders.receiverEmail,
      };

      emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        emailParams,
        process.env.NEXT_PUBLIC_EMAILJS
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader
          className="flex justify-center items-center h-screen"
          big={true}
        />
      ) : (
        <div className="py-7 px-10 max-sm:px-4 max-sm:py-4">
          {isClient && (
            <Card>
              <CardHeader>
                <CardTitle>RTN: {params.rtn}</CardTitle>
              </CardHeader>
              <CardContent>
                <Card className="border-0">
                  <CardContent className="p-0 grid grid-cols-4 grid-rows-2 max-xl:grid-cols-3 max-xl:grid-rows-4 gap-3">
                    <Card className="col-span-1 row-span-1 max-xl:col-span-3">
                      <CardHeader>
                        <CardTitle>Information Details</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-5">
                        <div className="flex flex-col">
                          <p className="text-base text-muted-foreground">
                            Recipient Information
                          </p>
                          <Separator />
                          <p>
                            {orders.receiverName} | {orders.receiverEmail} |{" "}
                            {orders.receiverAddress}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base text-muted-foreground">
                            Sender Information
                          </p>
                          <Separator />
                          <p>
                            {orders.senderName} | {orders.senderEmail} |{" "}
                            {orders.senderAddress}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base text-muted-foreground">
                            Delivery Service Information
                          </p>
                          <Separator />
                          <p>
                            {deliveryService.name} | {deliveryService.email}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-3 row-span-1 max-xl:row-span-2">
                      <CardHeader>
                        <CardTitle>Update Status</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-10">
                        <RadioGroup
                          className="flex flex-row max-lg:flex-col justify-evenly max-lg:gap-5"
                          defaultValue={
                            details.currentStatus === "Order Placed"
                              ? "option-order"
                              : details.currentStatus ===
                                "Arrived at Sort Center"
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
                          <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                            <RadioGroupItemWithIcons
                              disabled={
                                details.currentStatus ===
                                  "Arrived at Sort Center" ||
                                details.currentStatus === "In Transit" ||
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered"
                              }
                              onClick={() => handleChange("Order Placed")}
                              value="option-order"
                              id="option-order"
                              selected={"option-order"}
                              className={`h-16 w-16 my-2 disabled:opacity-100 ${
                                details.currentStatus === "Order Placed" ||
                                details.currentStatus ===
                                  "Arrived at Sort Center" ||
                                details.currentStatus === "In Transit" ||
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered" ||
                                status === "Order Placed" ||
                                status === "Arrived at Sort Center" ||
                                status === "In Transit" ||
                                status === "Arrived at the Logistics Hub" ||
                                status === "Delivered"
                                  ? "bg-green-500 border-green-500 text-secondary"
                                  : "border-border"
                              }`}
                            />
                            <Label
                              htmlFor="option-order"
                              className="justify-self-center"
                            >
                              <div className="flex flex-col justify-center pl-2">
                                <h1 className="font-bold text-base border-slate-600">
                                  Order Placed
                                </h1>
                                <p className="text-[#ffffffdb] text-sm">
                                  Ready for pick up
                                </p>
                                <p className="text-sm text-[#808080]">
                                  {details?.orderPlacedDate?.toLocaleDateString()}
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                            <RadioGroupItemWithIcons
                              disabled={
                                details.currentStatus === "In Transit" ||
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered"
                              }
                              onClick={() => {
                                {
                                  handleChange("Arrived at Sort Center");
                                }
                              }}
                              value="option-center"
                              id="option-center"
                              selected="option-center"
                              className={`h-16 w-16 my-2 disabled:opacity-100 ${
                                details.currentStatus ===
                                  "Arrived at Sort Center" ||
                                details.currentStatus === "In Transit" ||
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered" ||
                                status === "Arrived at Sort Center" ||
                                status === "In Transit" ||
                                status === "Arrived at the Logistics Hub" ||
                                status === "Delivered"
                                  ? "bg-green-500 border-green-500 text-secondary"
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
                                  <span className="block">
                                    Logistics Facility:
                                  </span>{" "}
                                  {details.centerLocation}
                                </p>
                                <p className="text-sm text-[#808080]">
                                  {details?.centerDate !== null
                                    ? details?.centerDate?.toLocaleDateString()
                                    : ""}
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                            <RadioGroupItemWithIcons
                              disabled={
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered"
                              }
                              onClick={() => {
                                {
                                  handleChange("In Transit");
                                }
                              }}
                              value="option-intransit"
                              id="option-intransit"
                              selected="option-intransit"
                              className={`w-16 h-16 my-2 disabled:opacity-100 ${
                                details.currentStatus === "In Transit" ||
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered" ||
                                status === "In Transit" ||
                                status === "Arrived at the Logistics Hub" ||
                                status === "Delivered"
                                  ? "bg-green-500 border-green-500 text-secondary"
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
                                <p className="text-sm text-[#808080]">
                                  {details?.inTransitDate !== null
                                    ? details?.inTransitDate?.toLocaleDateString()
                                    : ""}
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                            <RadioGroupItemWithIcons
                              disabled={details.currentStatus === "Delivered"}
                              onClick={() => {
                                {
                                  handleChange("Arrived at the Logistics Hub");
                                }
                              }}
                              value="option-hub"
                              id="option-hub"
                              selected="option-hub"
                              className={`w-16 h-16 my-2 disabled:opacity-100 ${
                                details.currentStatus ===
                                  "Arrived at the Logistics Hub" ||
                                details.currentStatus === "Delivered" ||
                                status === "Arrived at the Logistics Hub" ||
                                status === "Delivered"
                                  ? "bg-green-500 border-green-500 text-secondary"
                                  : "border-border"
                              }`}
                            />
                            <Label
                              htmlFor="option-hub"
                              className="justify-self-center"
                            >
                              <div className="flex flex-col justify-center pl-2">
                                <h1 className="font-bold text-base border-slate-600">
                                  Arrived at the Logistics Hub
                                </h1>
                                <p className="text-[#ffffffdb] text-sm">
                                  <span className="block">
                                    Logistics Facility:
                                  </span>{" "}
                                  {details.hubLocation}
                                </p>
                                <p className="text-sm text-[#808080]">
                                  {details?.hubDate !== null
                                    ? details?.hubDate?.toLocaleDateString()
                                    : ""}
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex flex-col max-lg:flex-row max-lg:items-center">
                            <RadioGroupItemWithIcons
                              onClick={() => {
                                handleChange("Delivered");
                              }}
                              value="option-delivered"
                              id="option-delivered"
                              selected="option-delivered"
                              className={`w-16 h-16 my-2 disabled:opacity-100 ${
                                details.currentStatus === "Delivered" ||
                                status === "Delivered"
                                  ? "bg-green-500 border-green-500 text-secondary"
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
                                <p className="text-sm text-[#808080]">
                                  {deliveryDate?.toLocaleDateString()}
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>

                        <div className="flex justify-end">
                          <AlertDialog className="flex justify-end">
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="primary"
                                className="bg-primary text-white dark:text-black"
                              >
                                Update
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Parcel Status Update
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to update the status of
                                  this parcel to:{" "}
                                  <span className="text-white">{status}</span>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleStatusUpdate}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-4 row-span-1 max-xl:col-span-3 max-xl:row-span-1">
                      <CardHeader>
                        <CardTitle>Item Ordered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Unit Price</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Item Subtotal</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {itemsData &&
                              itemsData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.itemName}</TableCell>
                                  <TableCell>
                                    {item.itemPrice.toLocaleString("en-PH", {
                                      style: "currency",
                                      currency: "PHP",
                                    })}
                                  </TableCell>
                                  <TableCell>{item.itemQuantity}</TableCell>
                                  <TableCell>
                                    {(
                                      item.itemPrice * item.itemQuantity
                                    ).toLocaleString("en-PH", {
                                      style: "currency",
                                      currency: "PHP",
                                    })}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="flex justify-end mr-5">
                        <div>
                          <h3 className="font-bold text-base border-slate-600">
                            Merchandise Subtotal:{" "}
                            {merchandiseSubtotal.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </h3>
                          <h3 className="text-base border-slate-600">
                            Shipping Total:{" "}
                            {shippingTotal.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </h3>
                          <h3 className="text-base border-slate-600">
                            Total Payment:{" "}
                            {totalPayment.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </h3>
                        </div>
                      </CardFooter>
                    </Card>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
