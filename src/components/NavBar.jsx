"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";
import { useRouter } from "next/navigation";
import {
  checkRole,
  deliveryServiceRole,
  senderRole,
} from "../app/api/handleRole";
import { createSenderAccount } from "../app/api/createSenderAccount";
import { useLayoutEffect } from "react";

async function checkAndHandleRole(session, router) {
  if (!session) return;

  const isDeliveryAcc = await checkRole(session.user?.email);

  if (isDeliveryAcc) {
    await deliveryServiceRole(session.user?.email);
    router.replace("/dashboard");
  } else {
    await senderRole(session.user?.email);
    await createSenderAccount(session.user.email);
    router.replace("/send-parcel");
  }
}

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    checkAndHandleRole(session, router);
  }, [session, router]);

  if (session?.user) {
    return (
      <>
        {session.user.name} <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in</button>;
}

export default function NavBar() {
  return (
    <div className="flex w-full items-center justify-between py-2 px-4">
      <AuthButton />
      <ModeToggle />
    </div>
  );
}
