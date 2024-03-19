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
import { createSender, senderExists } from "../api/handleUser";
import { useRouter } from "next/navigation";
import { createOrder, getOrder, getSenderAccount } from "../api/test";
import { collection } from "firebase/firestore";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export default function CompleteAccount() {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
    },
  });

  (async () => {
    if (session) {
      try {
        if (
          (await senderExists(session?.user.email)) ||
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
        address: data.address,
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
                className="space-y-4"
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Street" {...field} />
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
