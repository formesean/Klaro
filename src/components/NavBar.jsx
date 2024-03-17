"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";
import { Button } from "./ui/button";
import { NavItems } from "../app/links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

function AuthButton({ user }) {
  if (user) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }

  return <Button onClick={() => signIn("google")}>Sign in</Button>;
}

function NavLink({ item, currentPath }) {
  const { theme } = useTheme();
  const activeLink =
    theme === "dark"
      ? "px-4 py-2 mx-2 border-b-2 border-white transition-all duration-300"
      : "px-4 py-2 mx-2 border-b-2 border-black transition-all duration-300";
  const staticLink =
    theme === "dark"
      ? "px-4 py-2 mx-2 border-b-2 border-transparent hover:border-white white transition-all duration-300"
      : "px-4 py-2 mx-2 border-b-2 border-transparent hover:border-black white transition-all duration-300";

  return (
    <Link href={item.path}>
      <p
        key={item.title}
        href={item.path}
        className={`${currentPath === item.path ? activeLink : staticLink}`}
      >
        {item.title}
      </p>
    </Link>
  );
}

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const userRole = user?.role || "receiver";
  const currentPath = usePathname();

  return (
    <div className="flex w-full items-center justify-between py-2 px-4">
      <div className="flex items-center justify-center gap-10">
        <div>
          <h1 className="text-2xl">Klaro</h1>
        </div>
        <div className="flex items-center">
          {NavItems.filter(
            (item) =>
              item.for === "all" ||
              (item.for === "receiver" && !userRole) ||
              (item.for === "receiver" && userRole === "receiver") ||
              (Array.isArray(item.for) && item.for.includes(userRole))
          ).map((item) => (
            <NavLink key={item.title} item={item} currentPath={currentPath} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <AuthButton user={user} />
        <ModeToggle />
      </div>
    </div>
  );
}
