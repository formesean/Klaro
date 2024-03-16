"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <div>
      <div>
        <h1>Sender Dashboard</h1>
      </div>
    </div>
  );
}
