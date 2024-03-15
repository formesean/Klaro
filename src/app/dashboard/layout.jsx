"use client";
import { useSession } from "next-auth/react";

export default function Layout({ sender, deliveryservice }) {
  const { data: session } = useSession();
  const role = session?.user.role;

  return <>{role === "deliveryService" ? deliveryservice : sender}</>;
}
