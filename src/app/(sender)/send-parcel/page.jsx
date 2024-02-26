"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function SendParcel() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE SENDER PAGE</h1>
      <h2>YOU ARE LOGGED IN IF YOU SEE THIS PAGE</h2>
    </div>
  );
}
