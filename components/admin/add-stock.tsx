"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { stockSchema } from "@/schemas";
import {toast} from "react-hot-toast";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryItem } from "@/data/types";
import { addStock } from "@/data/stock";
import { useRouter } from "next/navigation";

interface AddCategoryProps {
  children: React.ReactNode;
}


  
const AddStock = ({ children }: AddCategoryProps) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
    defaultValues: {},
  });

  

  const [isLoading, setIsLoading] = useState(false);
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof stockSchema>) => {
    
    try {
      setIsLoading(true);
      await addStock({
        name: values.name,
        qty: Number(values.qty),
        qty_unit: values.qty_unit,
      });
      toast.success("Stock added successfully!");


     
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add stock."
      );
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Enter the details of your new Product.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Name:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Wheat Flour" />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="100" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qty_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Unit</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Unit of measurement " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="int">Integer</SelectItem>
                          <SelectItem value="g">Gram (g)</SelectItem>
                          <SelectItem value="kg">Kilogram (kg)</SelectItem>
                          <SelectItem value="ml">Milliliter (ml)</SelectItem>
                          <SelectItem value="l">Liter (l)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Whether the quantity is int, g, kg, ml, l
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button  type="submit">Create</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStock;
