import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "../components/theme-provider";
import { cn } from "../lib/utils";
import { authOptions } from "../lib/auth";
import { Toaster } from "../components/ui/toaster";
import bg_black from "../../public/bg_black.jpg";
import bg_white from "../../public/bg_white.jpg";
import Image from "next/image";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  return (
    <html lang="en" className="scroll-smooth scrollbar-thin">
      <body
        className={cn(
          "max-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <Image
          src={theme === "dark" ? bg_black : bg_white}
          fill
          className="absolute blur-[2px] object-contain object-top -z-10"
        /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
