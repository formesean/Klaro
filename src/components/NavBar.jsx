"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { checkRole } from "../app/api/checkRole";
import { createSenderAccount } from "../app/api/createSenderAccount";

async function checkIfAuthorized(session) {
  if (session && session.user) {
    const isAuthorized = await checkRole(session.user.email);
    return isAuthorized;
  }
  return false;
}

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleRole = async () => {
      const isDeliveryAcc = await checkIfAuthorized(session);

      if (isDeliveryAcc) {
        router.push("/dashboard");
      } else {
        if (session && session.user) {
          createSenderAccount(session.user.email);
          router.push("/send-parcel");
        }
      }
    };

    handleRole();
  }, [session]);

  if (session && session.user) {
    return (
      <>
        {session?.user?.name}{" "}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}

export default function NavBar() {
  return (
    <div className="flex w-full items-center justify-between py-2 px-4">
      <AuthButton />
      <ModeToggle />
    </div>
  );
}
