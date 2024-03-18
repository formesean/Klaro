"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/ModeToggle";
import { Button } from "./ui/button";
import { NavItems } from "../app/links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function AuthButton({ user }) {
  if (user) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }

  return <Button onClick={() => signIn("google")}>Sign in</Button>;
}

function NavLink({ item, currentPath, theme, onClick }) {
  const activeLink =
    theme === "dark"
      ? "text-center px-4 py-2 mx-2 border-b-2 border-white transition-all duration-300"
      : "text-center px-4 py-2 mx-2 border-b-2 border-black transition-all duration-300";
  const staticLink =
    theme === "dark"
      ? "text-center px-4 py-2 mx-2 border-b-2 border-transparent hover:border-white white transition-all duration-300"
      : "text-center px-4 py-2 mx-2 border-b-2 border-transparent hover:border-black white transition-all duration-300";

  return (
    <Link href={item.path}>
      <p
        key={item.title}
        href={item.path}
        className={`${currentPath === item.path ? activeLink : staticLink}`}
        onClick={onClick}
      >
        {item.title}
      </p>
    </Link>
  );
}

export default function NavBar() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const currentPath = usePathname();

  const [user, setUser] = useState(session?.user);
  const [userRole, setUserRole] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setUser(session?.user || null);
    setUserRole(session?.user?.role || "receiver");
  }, [session]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="flex justify-between items-center py-2 px-4">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold">Klaro</h1>
        <div className="hidden sm:flex items-center gap-6">
          {NavItems.filter(
            (item) =>
              item.for === "all" ||
              (item.for === "receiver" && !userRole) ||
              (item.for === "receiver" && userRole === "receiver") ||
              (Array.isArray(item.for) && item.for.includes(userRole))
          ).map((item) => (
            <NavLink
              key={item.title}
              item={item}
              currentPath={currentPath}
              theme={theme}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ModeToggle />
        <button
          className={`block sm:hidden focus:outline-none ${
            showMenu ? (theme === "dark" ? "text-white" : "text-black") : ""
          }`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu className={`h-6 w-6 ${showMenu ? "hidden" : "block"}`} />
          <X className={`h-6 w-6 ${showMenu ? "block" : "hidden"}`} />
        </button>

        <div className="hidden sm:flex items-center gap-6">
          <AuthButton user={user} onClick={closeMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${showMenu ? "flex" : "hidden"} ${
          theme === "dark" ? "bg-black" : "bg-white"
        } sm:hidden flex-col gap-4 absolute w-[90%] top-14 left-2/4 -translate-x-2/4 p-4 rounded-lg shadow-[rgb(255 255 255 / 0.5)] shadow`}
      >
        {NavItems.filter(
          (item) =>
            item.for === "all" ||
            (item.for === "receiver" && !userRole) ||
            (item.for === "receiver" && userRole === "receiver") ||
            (Array.isArray(item.for) && item.for.includes(userRole))
        ).map((item) => (
          <NavLink
            key={item.title}
            item={item}
            currentPath={currentPath}
            theme={theme}
            mobile
            onClick={closeMenu}
          />
        ))}
        <AuthButton user={user} mobile onClick={closeMenu} />
      </div>
    </div>
  );
}
