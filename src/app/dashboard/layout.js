"use client";
import { useSession } from "next-auth/react";

export default function Layout({ sender, deliveryService }) {
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <section>{role === "deliveryService" ? deliveryService : sender}</section>
  );
}
