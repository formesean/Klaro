"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return redirect("/");
  } else {
     if (session.user.role === "deliveryService") {
      return router.replace("/dashboard");
    }

    if (session.user.role === "sender") {
      return router.replace("/send-parcel");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE DELIVERY SERVICE PAGE</h1>
      <h2>YOU ARE LOGGED IN IF YOU SEE THIS PAGE</h2>
    </div>
  );
}
