"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  ArrowUpDown,
  Divide,
  Loader,
  MoreHorizontal,
  Radio,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label } from "@radix-ui/react-dropdown-menu";
import { DeliveryStatus } from "../dashboard/@sender/components/DeliveryStatus";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../components/ui/radio-group";
import Image from "next/image";
import uy_about_us from "../../../public/uy_about_us.png";
import aguilar_about_us from "../../../public/aguilar_about_us.png";
import canos_about_us from "../../../public/canos_about_us.png";
import ochia_about_us from "../../../public/ochia_about_us.png";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="my-4 ">
          <div className="">
            <p className="text-center text-6xl font-bold">WE ARE KLARO</p>
          </div>
        </div>
        <div className="">
          <div className="flex my-8 align-items-center place-items-center justify-center">
            <p className="text-center max-w-[1400px] pl-7 pr-7">
              Embark on a daring journey with Klaro, where four college comrades
              converge to reinvent parcel tracking. Fueled by late-night pizza
              and boundless creativity, we're reshaping shipping with coding
              mastery, design finesse, and logistical expertise. Join us on this
              epic quest as we transform every parcel journey into a thrilling
              saga under the banner of Klaro.
            </p>
          </div>
        </div>
        <div className="border border-x-0 flex flex-col">
          <div className="">
            <div className="my-2.5">
              <h1 className="text-xl font-bold text-center">Meet The Team</h1>
            </div>
            <div className="my-3 flex align-items-center place-items-center justify-center gap-10 max-xl:flex-col">
              <div className="flex flex-col">
                <div className="m-4">
                  <Image
                    src={aguilar_about_us}
                    width={180}
                    alt="Picture of Sean Aguilar"
                  />
                  <div className="flex flex-col align-items-center place-items-center justify-center">
                    <p className="text-white font-bold text-lg py-3">
                      Sean Aguilar
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/formesean"
                        target="_blank"
                        title="GitHub"
                      >
                        <Github className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a href="mailto:seanaguilar698@gmail.com" title="Gmail">
                        <Mail className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/seanaguilar04"
                        target="_blank"
                        title="LinkedIn"
                      >
                        <Linkedin className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="m-4">
                  <Image
                    src={canos_about_us}
                    width={180}
                    alt="Picture of Bea Canos"
                  />
                  <div className="flex flex-col align-items-center place-items-center justify-center">
                    <p className="text-white font-bold text-lg py-3">
                      Bea Canos
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/vaebelle"
                        target="_blank"
                        title="GitHub"
                      >
                        <Github className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a href="mailto:beabelle.canos@gmail.com" title="Gmail">
                        <Mail className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/beabellecanos"
                        target="_blank"
                        title="LinkedIn"
                      >
                        <Linkedin className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="m-4">
                  <Image
                    src={ochia_about_us}
                    width={180}
                    alt="Picture of May Ochia"
                  />
                  <div className="flex flex-col align-items-center place-items-center justify-center">
                    <p className="text-white font-bold text-lg py-3">
                      May Ochia
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/Mayochia"
                        title="GitHub"
                        target="_blank"
                      >
                        <Github className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a href="mailto:mayochia5@gmail.com" title="Gmail">
                        <Mail className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/may-ochia-086267270/"
                        title="LinkedIn"
                        target="_blank"
                      >
                        <Linkedin className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="m-4">
                  <Image
                    src={uy_about_us}
                    width={180}
                    alt="Picture of Lysander Uy"
                  />
                  <div className="flex flex-col align-items-center place-items-center justify-center">
                    <p className="text-white font-bold text-lg py-3">
                      Lysander Uy
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/lysanderuy"
                        target="_blank"
                        title="GitHub"
                      >
                        <Github className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a href="mailto:lysander.uy@gmail.com" title="Gmail">
                        <Mail className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/lysander-uy-805557223/"
                        target="_blank"
                        title="LinkedIn"
                      >
                        <Linkedin className="hover:animate-bounce hover:stroke-[#22C55E]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3.5 place-items-center flex align-items-center justify-center">
          <p className="text-xs text-gray-300 text-center pl-8 pr-8 py-4">
            So sit back, relax, and let Klaro take the wheel. Your parcels are
            in good hands...and maybe a few robot arms.
          </p>
        </div>
      </div>
    </div>
  );
}
