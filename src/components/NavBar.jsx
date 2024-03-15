"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";
import { Button } from "./ui/button";

function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <>
        {session.user.name} <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }

  return <Button onClick={() => signIn("google")}>Sign in</Button>;
}

export default function NavBar() {
  return (
    <div className="flex w-full items-center justify-between py-2 px-4 bg-slate-800">
      <AuthButton />
      <ModeToggle />
    </div>
  );
}
