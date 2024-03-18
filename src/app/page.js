"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { senderExists } from "./api/handleUser";

export default async function Home() {
  const { data: session } = useSession();

  if (session?.user.role === "deliveryService") {
    return redirect("/dashboard");
  }

  if (
    session?.user.role === "sender" &&
    !(await senderExists(session?.user.email))
  ) {
    return redirect("/account");
  } else if (session?.user.role === "sender") {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
