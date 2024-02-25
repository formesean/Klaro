import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // comment line 9 to 11 to visit the sender page without logging in
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE DELIVERY SERVICE PAGE</h1>
      <h2>YOU ARE LOGGED IN IF YOU SEE THIS PAGE</h2>
    </div>
  );
}
