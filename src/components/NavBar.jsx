"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
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
    <div>
      <AuthButton />
    </div>
  );
}
