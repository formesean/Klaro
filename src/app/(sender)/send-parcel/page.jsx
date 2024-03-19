"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "../../components/ui/button"; // Import Button component

export default function SendParcel() {
  const { data: session } = useSession();
  // const router = useRouter();

  if (!session || session.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE SENDER PAGE</h1>
      <h2>YOU ARE LOGGED IN IF YOU SEE THIS PAGE</h2>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </div>
    
  );
}
