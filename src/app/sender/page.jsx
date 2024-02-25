import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE SENDER PAGE</h1>
      <h2>YOU ARE LOGGED IN IF YOU SEE THIS PAGE</h2>
    </div>
  );
}
