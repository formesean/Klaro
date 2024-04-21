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
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
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
} from "../../../components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label } from "@radix-ui/react-dropdown-menu";
import { DeliveryStatus } from "../@sender/components/DeliveryStatus";
import {
  RadioGroup,
  RadioGroupItemWithIcons,
} from "../../../components/ui/radio-group";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session && session?.user.role !== "deliveryService") {
    return redirect("/");
  }

  return (
  <div>This is the Delivery Service Dashboard</div>
  );
}
