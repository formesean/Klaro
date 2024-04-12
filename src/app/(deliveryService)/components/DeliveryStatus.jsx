import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Copy, Check, X } from "lucide-react";

export function DeliveryStatus({
  parcelData,
  copied,
  copyText,
  orderData,
  details,
  handleHideDetail,
}) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-lg">Delivery Status</p>
          <p className="font-bold font text-sm text-[#808080]">
            {orderData.receiverName}
          </p>
          <div className="flex gap-1">
            <p
              id="textToCopy"
              className="font-bold font text-sm text-[#808080]"
            >
              {parcelData.rtn}
            </p>
            <button
              onClick={copyText}
              disabled={copied}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-5 w-5 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Button
            className="px-3 -py-3 rounded-full"
            variant="ghost"
            onClick={handleHideDetail}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        <RadioGroup
          disabled
          defaultValue={
            details.currentStatus === "Order Placed"
              ? "option-order"
              : details.currentStatus === "Arrived at Sort Center"
              ? "option-center"
              : details.currentStatus === "In Transit"
              ? "option-intransit"
              : details.currentStatus === "Arrived at the Logistics Hub"
              ? "option-hub"
              : details.currentStatus === "Delivered"
              ? "option-delivered"
              : ""
          }
          className="gap-5"
        >
          <div className="flex items-center space-x-2">
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
                      {details.deliveryDate.toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-[#ffffffdb]">Parcel has been delivered</p>
                </div>
              </Label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <RadioGroupItemWithIcons
                value="option-hub"
                id="option-hub"
                selected="option-hub"
                className={`w-16 h-16 disabled:opacity-100 ${
                  details.currentStatus === "Arrived at the Logistics Hub" ||
                  details.currentStatus === "Delivered"
                    ? "bg-green-500 border-green-500 text-secondary"
                    : "border-border"
                }`}
              />
              <Label htmlFor="option-hub">
                <div className="flex flex-col justify-center pl-2">
                  <div className="flex justify-start items-center gap-4">
                    <h1 className="font-bold text-base">
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

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <RadioGroupItemWithIcons
                value="option-intransit"
                id="option-intransit"
                selected="option-intransit"
                className={`w-16 h-16 disabled:opacity-100 ${
                  details.currentStatus === "In Transit" ||
                  details.currentStatus === "Arrived at the Logistics Hub" ||
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

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <RadioGroupItemWithIcons
                value="option-center"
                id="option-center"
                selected="option-center"
                className={`w-16 h-16 disabled:opacity-100 ${
                  details.currentStatus === "Arrived at Sort Center" ||
                  details.currentStatus === "In Transit" ||
                  details.currentStatus === "Arrived at the Logistics Hub" ||
                  details.currentStatus === "Delivered"
                    ? "bg-green-500 border-green-500 text-secondary"
                    : "border-border"
                }`}
              />
              <Label htmlFor="option-center">
                <div className="flex flex-col justify-center pl-2">
                  <div className="flex justify-start items-center gap-4">
                    <h1 className="font-bold text-base">
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

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <RadioGroupItemWithIcons
                value="option-order"
                id="option-order"
                selected="option-order"
                className={`w-16 h-16 disabled:opacity-100 ${
                  details.currentStatus === "Order Placed" ||
                  details.currentStatus === "Arrived at Sort Center" ||
                  details.currentStatus === "In Transit" ||
                  details.currentStatus === "Arrived at the Logistics Hub" ||
                  details.currentStatus === "Delivered"
                    ? "bg-green-500 border-green-500 text-secondary"
                    : "border-border"
                }`}
              />
              <Label htmlFor="option-order">
                <div className="flex flex-col justify-center pl-2">
                  <div className="flex justify-center items-center gap-4">
                    <h1 className="font-bold text-base">Order Placed</h1>
                    <p className="text-sm text-[#808080]">
                      {details.orderPlacedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-[#ffffffdb]">Ready for pick-up</p>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
