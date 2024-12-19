"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { BellRing, ExternalLink, PackageCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Order = {
  id: string;
  userID: string;
  deliverydatetime: string;
  status: "paid" | "unpaid";
  paymentmethod: "card" | "cash";
  confirmationcode: string;
  order_type: "online";
  phone: string;
};

export const OnlineOrdersColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      <div>{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "deliverydatetime",
    header: "Delivery Date & Time",
    cell: ({ row }) => {
      const deliveryDateTime = row.getValue("deliverydatetime"); // Get the raw value

      // Function to format the datetime to a readable format
      const formatDateTime = (utcString: string) => {
        if (!utcString) return "N/A"; // Handle cases where the value is null or undefined
        const date = new Date(utcString);
        const options = {
          timeZone: "Asia/Colombo", // Convert to Sri Lanka time zone
          year: "numeric" as const,
          month: "long" as const,
          day: "numeric" as const,
          hour: "2-digit" as const,
          minute: "2-digit" as const,
          second: "2-digit" as const,
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
      };

      return <div>{formatDateTime(deliveryDateTime as string)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const paymentMethod = row.original.status;
      // const status = paymentMethod === "card" ? "paid" : "unpaid";
      return <div>{paymentMethod}</div>;
    },
  },
  {
    accessorKey: "paymentmethod",
    header: "Payment Method",
    cell: ({ row }) => <div>{row.getValue("paymentmethod")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex space-x-2">
          <Button
            variant="default"
            size={"icon"}
            className="bg-blue-500"
            onClick={() => alert(`View more: ${order.id}`)}>
            <ExternalLink size={16} />
          </Button>
          <Button
            variant="default"
            size={"icon"}
            className="bg-yellow-400"
            onClick={() =>
              alert(`Notify user that order ${order.id} is ready.`)
            }>
            <BellRing size={16} />
          </Button>
          <Button
            variant="default"
            size={"icon"}
            className="bg-green-500"
            onClick={() =>
              alert(
                `Verify order ${order.id} with OTP: ${order.confirmationcode}`
              )
            }>
            <PackageCheck size={16} />
          </Button>
        </div>
      );
    },
  },
];
