"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { senderExists } from "./api/handleUser";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      if (session) {
        if (session.user.role === "deliveryService") {
          router.replace("/dashboard");
        } else if (session.user.role === "sender") {
          if (!(await senderExists(session.user.email))) {
            router.replace("/account");
          } else {
            router.replace("/dashboard");
          }
        }
      }
    }

    redirectUser();
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  );
}
