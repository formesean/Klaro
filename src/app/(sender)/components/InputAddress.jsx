import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

export default function InputAddress({
  handleInputAddress,
  handleAddress,
  clearAddress,
  form,
  address,
}) {
  const [showError, setShowError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleContinue = () => {
    const addressFields = [
      "address",
      "city",
      "barangay",
      "province",
      "region",
      "zipcode",
      "country",
    ];
    const hasEmptyField = addressFields.some((field) => !form.getValues(field));

    if (hasEmptyField) {
      setAlertOpen(true);
      setShowError(true);
    } else {
      setShowError(false);
      handleAddress();
      setAlertOpen(false);
    }
  };

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Input
          readOnly
          type="string"
          onClick={() => {
            setAlertOpen(true);
            handleInputAddress;
          }}
          value={address || "Recipient Address"}
          className="overflow-x-auto scrollbar-none hover:cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-2 space-y-2 text-foreground">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Address{" "}
                    {showError && (
                      <span className="text-red-500 text-sm">
                        *Fill in all the fields
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Street Name, Building, House No."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Barangay" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Zip Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setAlertOpen(false);
              setShowError(false);
              clearAddress();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
