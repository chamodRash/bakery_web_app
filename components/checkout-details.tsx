"use client";

import React, { useEffect, useState, useTransition } from "react";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { BadgeCheck, CalendarIcon } from "lucide-react";
import { DataItem } from "@/data/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderFormSchema } from "@/schemas";
import { z } from "zod";
import {
  placeProductCardOrder,
  placeProductCashOrder,
} from "@/actions/checkout";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import useCart from "@/hooks/use-cart";

interface props {
  items: { product: DataItem; qty: number }[];
  type: "cart" | "product";
  name: string;
  phone: string | undefined;
}

const CheckoutDetails = ({ items, type, name, phone }: props) => {
  const [date, setDate] = useState<Date>();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isCard, setIsCard] = useState(false);
  const cart = useCart();

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: name,
      phone,
      note: "",
      date: new Date(),
      paymentMethod: "cash",
    },
  });

  function onSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log(values);
    if (values.paymentMethod === "cash") {
      startTransition(() => {
        placeProductCashOrder({ items, values }).then((result) => {
          if (result?.error) {
            toast.error("Something went wrong! try again later.");
          }
          if (result?.success) {
            toast.success(result.success);
            if (type === "cart") {
              const selectedCartItems = cart.items.filter(
                (item) => item.status === "checked"
              );
              selectedCartItems.map((item) => {
                cart.removeFromCart(item.id);
              });
            }
            setOrderSuccess(true);
          }
        });
      });
    } else if (values.paymentMethod === "card") {
      startTransition(() => {
        placeProductCardOrder({ items, values }).then((result) => {
          if (result?.redirectUrl) {
            const form = document.createElement("form");
            form.method = "POST";
            form.action = result?.redirectUrl;

            Object.keys(result?.params).forEach((key) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = String(
                result?.params[key as keyof typeof result.params]
              );
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
          }
        });
      });
    }
  }

  if (orderSuccess) {
    return (
      <div className="w-full h-screen flex items-start justify-center">
        <div className="bg-primary text-white rounded-lg flex items-center flex-col gap-y-5 p-10 text-center">
          <BadgeCheck size={40} />
          <h2 className="font-bold text-xl ">
            Your Order has been placed successfully
          </h2>
          <p className="text-sm ">Thank you for ordering our product!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg drop-shadow-lg p-5 relative">
      <p className="text-lg font-semibold text-center mb-5">Order Details</p>
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/80 rounded-lg flex flex-col items-center justify-center">
          <BeatLoader
            color={"#176b87"}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Your Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Your Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Order Note (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Order Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs">Order Required Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the date you want to pick your order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Payment Method <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash Payment</SelectItem>
                      <SelectItem value="card">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-10" type="submit" disabled={isPending}>
            Checkout Now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutDetails;
