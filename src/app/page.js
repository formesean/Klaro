"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // const router = useRouter();

  if (session?.user.role === "deliveryService") {
    return redirect("/dashboard");
  }

  if (session?.user.role === "sender") {
    return redirect("/send-parcel");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
