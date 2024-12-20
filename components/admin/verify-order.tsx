"use client";

import { ordersProps } from "@/data/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

interface VerifyOrderProps {
  order: ordersProps[];
  children: React.ReactNode;
}

const VerifyOrder = ({ order, children }: VerifyOrderProps) => {
  const [otp, setOtp] = useState("");

  const verify = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-11/12">
            <Label htmlFor="otp" className="text-center">
              Enter OTP
            </Label>
            <Input name="otp" onChange={(e) => setOtp(e.target.value)} />
          </div>
          <Button onClick={() => verify}>Verify</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOrder;
