"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    if (session.user.role === "deliveryService") {
      return router.replace("/dashboard");
    }

    if (session.user.role === "sender") {
      return router.replace("/send-parcel");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
