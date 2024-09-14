"use client";

import React, { useCallback, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getCheckedCartItems } from "@/data/cart";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";

import { Coins } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const CheckOutPage = () => {
  const supabase = createClient();

  let [cartItems, setCartItems] = useState<any[] | null>([]);
  const [date, setDate] = React.useState<Date>();

  const getCartItemsFromServer = useCallback(
    async (userId: string | undefined) => {
      const items = await getCheckedCartItems(userId);
      setCartItems(items);
    },
    []
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        window.location.href = "/login";
      } else {
        getCartItemsFromServer(user.id);
      }
    });
  }, [getCartItemsFromServer]);

  return (
    <div>
      <h1 className="text-center text-xl font-bold uppercase mb-10">
        Checkout
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // @ts-ignore
            cartItems?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="flex gap-x-3 items-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                    <p>{item.product.name}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {item.product.price}.00
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    Rs. {item.total}.00
                  </TableCell>
                </TableRow>
              );
            })
          }
          <TableRow>
            <TableCell colSpan={3} className="text-right text-base font-bold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold border-double border-b-2">
              Rs. {cartItems?.reduce((total, item) => total + item.total, 0)}.00
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="w-full mt-10">
        <p className="text-lg font-semibold text-center mb-5">Payment Method</p>
        <RadioGroup defaultValue="cash-on-delivery">
          <div className="w-full flex items-center space-x-2 pb-3">
            <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
            <Label
              htmlFor="cash-on-delivery"
              className="pl-4 flex items-center gap-x-3"
            >
              <Coins />
              <p>Cash on Delivery</p>
            </Label>
          </div>
          <Separator />
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="item-1" className="w-full">
              <div className="w-full flex items-center gap-x-3">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <AccordionTrigger>
                  <Label
                    htmlFor="credit-card"
                    className="pl-4 flex items-center gap-x-3"
                  >
                    <CreditCard />
                    <p>Card Payment</p>
                  </Label>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                <div className="w-full pl-8 flex flex-col gap-y-5">
                  <div className="w-full flex gap-x-3 items-center">
                    <Input
                      type="text"
                      placeholder="Card Number"
                      className="w-5/12 border-2"
                    />
                    <Input
                      type="text"
                      placeholder="Name on Card"
                      className="w-5/12 border-2"
                    />
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <div className="w-36 flex items-center justify-between mr-5">
                      <Input
                        type="text"
                        placeholder="MM"
                        className="w-16 border-2"
                      />
                      <span className="mx-2">/</span>
                      <Input
                        type="text"
                        placeholder="YY"
                        className="w-16 border-2"
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="CVV"
                      className="w-40 border-2"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </RadioGroup>
      </div>

      <div className="w-full mt-10">
        <p className="text-lg font-semibold text-center mb-5">Order Date</p>
        <div className="w-full flex items-center justify-between">
          <div className="w-3/4 flex flex-col gap-x-2">
            <p className="text-base">Pick a date</p>
            <p className="text-sm font-normal text-gray-600">
              When do you want your order? You can come and pick the order from
              our shop on this selected date
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
              <Select
                onValueChange={(value) =>
                  setDate(addDays(new Date(), parseInt(value)))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Today</SelectItem>
                  <SelectItem value="1">Tomorrow</SelectItem>
                  <SelectItem value="3">In 3 days</SelectItem>
                  <SelectItem value="7">In a week</SelectItem>
                </SelectContent>
              </Select>
              <div className="rounded-md border">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-x-5 mt-20">
        <Button variant={"secondary"} className="w-40 rounded-full">
          Cancel
        </Button>
        <Button variant={"default"} className="w-40 rounded-full">
          Buy
        </Button>
      </div>
    </div>
  );
};

export default CheckOutPage;
