"use client";
import { useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, redirect } from "next/navigation";
import { checkRole } from "../api/useUsers";
import { useSender } from "../api/useSender";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  barangay: z.string().min(3, {
    message: "Barangay must be at least 3 characters.",
  }),
  city: z.string().min(3, {
    message: "City must be at least 3 characters.",
  }),
  province: z.string().min(3, {
    message: "Province must be at least 3 characters.",
  }),
  region: z.string().min(3, {
    message: "Region must be at least 3 characters.",
  }),
  zipcode: z.string().min(3, {
    message: "Zip Code must be at least 3 characters.",
  }),
  country: z.string().min(3, {
    message: "Country must be at least 3 characters.",
  }),
});

export default function CompleteAccount() {
  const { data: session } = useSession();
  const { createSender } = useSender();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      barangay: "",
      city: "",
      province: "",
      region: "",
      zipcode: "",
      country: "",
    },
  });

  (async () => {
    if (session) {
      try {
        if (
          (await checkRole(session?.user.email)) ||
          session?.user.role === "deliveryService"
        ) {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      router.replace("/");
    }
  })();

  async function onSubmit(data) {
    try {
      const userData = {
        email: session?.user.email,
        fullName: data.fullName,
        address:
          data.address +
          ", " +
          data.barangay +
          ", " +
          data.city +
          ", " +
          data.province +
          ", " +
          data.region +
          ", " +
          data.zipcode +
          ", " +
          data.country,
        parcels: [],
      };

      await createSender(userData);

      router.replace("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <div className="flex flex-col justify-center items-center py-2">
        <Card>
          <CardHeader>
            <CardTitle>Complete your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Dela Cruz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Street Name, Building, House No."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="barangay"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Barangay" {...field} />
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
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Province" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Zip Code" {...field} />
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
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
