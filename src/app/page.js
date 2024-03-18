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

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { senderExists } from "./api/handleUser";
// import { Button } from "../components/ui/button";
// import { useDeliveryService } from "./api/useDeliveryService";

// export default function Home() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     async function redirectUser() {
//       if (session) {
//         if (session.user.role === "deliveryService") {
//           router.replace("/dashboard");
//         } else if (session.user.role === "sender") {
//           if (!(await senderExists(session.user.email))) {
//             router.replace("/account");
//           } else {
//             router.replace("/dashboard");
//           }
//         }
//       }
//     }

//     redirectUser();
//   }, [session, router]);

//   const {
//     createDeliveryService,
//     fetchDeliveryService,
//     updateDeliveryService,
//     removeDeliveryService,
//   } = useDeliveryService();

//   const data = {
//     email: "seanaguilar698@gmail.com",
//     name: "SA Express",
//     parcels: [],
//   };

//   async function handleSubmit() {
//     const print = await createDeliveryService(data);
//     console.log(print);
//     console.log(await fetchDeliveryService(print));

//     const updatedData = {
//       name: "SKA Express",
//     };

//     await updateDeliveryService(print, updatedData);
//     console.log(await fetchDeliveryService(print));

//     await removeDeliveryService(print);
//     console.log(await fetchDeliveryService(print));
//   }

//   return (
//     <div className="flex flex-col items-center justify-center py-2 gap-5">
//       <Button onClick={handleSubmit}>
//         Create, then Read, then Update, then Read seanaguilar698@gmail.com
//       </Button>
//     </div>
//   );
// }
