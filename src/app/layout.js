import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "../components/theme-provider";
import { cn } from "../lib/utils";
import { authOptions } from "../lib/auth";
import { Toaster } from "../components/ui/toaster";
import Image from "next/image";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Klaro",
  description: "Landing page | Klaro",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="scroll-smooth scrollbar-thin">
      <body
        className={cn(
          "max-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Image
          priority={true}
          src={"/bg_black.jpg"}
          width={999999}
          height={999999}
          className="hidden dark:block absolute blur-[2px] object-contain object-top -z-10"
        />
        <Image
          priority={true}
          src={"/bg_white.jpg"}
          width={999999}
          height={999999}
          className="block dark:hidden absolute blur-[2px] object-contain object-top -z-20"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NavBar />
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
