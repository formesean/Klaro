"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";

function AuthButton() {
  const { data: session } = useSession();

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
