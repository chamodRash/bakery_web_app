"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductBySlug } from "@/data/product";
import { DataItem } from "@/data/types";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ProductCheckoutPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("slug");
  const productQty = searchParams.get("qty");

  const [product, setProduct] = useState<any>();
  const [user, setUser] = useState();
  const [isMount, setIsMount] = useState(false);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setIsMount(true);
    async function getUser() {
      const user = supabase.auth.getUser();
    }
    async function fetchProduct() {
      if (productSlug) {
        try {
          const fetchedProduct = await getProductBySlug(productSlug);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    }

    fetchProduct();
  }, [productSlug]);

  if (!product || !isMount) {
    return (
      <div className="h-screen w-11/12 mx-auto pt-16">
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
            <TableRow>
              <TableCell colSpan={4}>
                <Skeleton className="w-full h-16 rounded-lg" />
              </TableCell>
            </TableRow>
            {!productSlug && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Skeleton className="w-full h-16 rounded-lg" />
                </TableCell>
              </TableRow>
            )}
            {!productSlug && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Skeleton className="w-full h-16 rounded-lg" />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell>
                <Skeleton className="w-full h-16 rounded-lg" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ); // Show loading state while fetching product data
  }

  return (
    <div className="min-h-screen h-fit w-11/12 mx-auto py-16">
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
          <TableRow key={product.id}>
            <TableCell className="flex gap-x-3 items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className="w-10 h-10 rounded-sm object-cover"
              />
              <p>{product.name}</p>
            </TableCell>
            <TableCell className="text-right">Rs. {product.price}.00</TableCell>
            <TableCell className="text-center">{Number(productQty)}</TableCell>
            <TableCell className="text-right">
              Rs. {product.price * Number(productQty)}.00
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="text-right text-base font-bold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold border-double border-b-2">
              Rs. {product.price}.00
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="w-full mt-10">
        <p className="text-lg font-semibold text-center mb-5">Order Details</p>
        <div className="w-full flex flex-col gap-y-5 items-center justify-between">
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
    </div>
  );
}
