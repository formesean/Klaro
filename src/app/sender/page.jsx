import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div>
      THIS IS THE SENDER PAGE <br /> <br />
      YOU'RE LOGGED IN IF YOU SEE THIS PAGE
    </div>
  );
}
