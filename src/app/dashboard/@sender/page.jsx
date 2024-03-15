"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { senderExists } from "../../api/handleUser";
// import CompleteAccount from "../../../components/CompleteAccount";
// import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  // const [showCard, setShowCard] = useState(false);

  if (!session && session?.user.role !== "sender") {
    return redirect("/");
  }

  return (
    <div>
      <div>
        <h1>Sender Dashboard</h1>
      </div>
    </div>
  );

  // useEffect(async () => {
  //   const accExists = senderExists(session.user.email);
  //   setShowCard(!accExists);
  // }, []);

  // return (
  //   <div>
  //     {showCard && <CompleteAccount />}
  //     <div className={showCard ? "blur select-none" : ""}>
  //       <h1>Sender Dashboard</h1>
  //     </div>
  //   </div>
  // );
}
