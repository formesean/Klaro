"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { senderExists } from "../api/handleUser";

export default async function CompleteAccount() {
  const { data: session } = useSession();

  if (!session) {
    return redirect("/");
  }

  if (
    (session.user.role !== "sender" ||
      session.user.role !== "deliveryService") &&
    (await senderExists(session?.user.email))
  ) {
    return redirect("/dashboard");
  }

  // TO DO: redirect the user into the dashboard after the account creation is complete
  const handleButton = () => {};

  return (
    <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <div className="flex flex-col justify-center items-center py-2">
        <Card>
          <CardHeader>
            <CardTitle>Complete your account</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input type="text" id="fullName" placeholder="Juan Dela Cruz" />
            </div>
            <div className="grid w-full max-w-sm gap-1.5 mt-5">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" placeholder="123 Street" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleButton()}>
              Create account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
