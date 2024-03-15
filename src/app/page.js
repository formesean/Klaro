"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (
    session?.user.role === "deliveryService" ||
    session?.user.role === "sender"
  ) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
