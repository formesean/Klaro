"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUsers } from "./api/useUsers";

export default function Home() {
  const { data: session } = useSession();
  const { senderExists } = useUsers();

  const userExists = async (sessionEmail) => {
    return await senderExists(sessionEmail);
  };

  if (session && session?.user.role === "deliveryService") {
    return redirect("/dashboard");
  }

  if (session && session?.user.role === "sender") {
    const exists = userExists(session.user.email);

    if (!exists) {
      return redirect("/account");
    } else {
      return redirect("/dashboard");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
