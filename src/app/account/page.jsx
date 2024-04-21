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
  address1: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  address2: z.string().min(3, {
    message: "Address must be at least 3 characters.",
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
      address1: "",
      address2: "",
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
        address: data.address1 + ", " + data.address2,
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
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
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
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Barangay, City, Province, Region"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
