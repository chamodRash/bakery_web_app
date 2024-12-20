import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { stockSchema } from "@/schemas";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { updateStock } from "@/data/stock";
import { stockProps } from "@/data/types";
import { useRouter } from "next/navigation";

interface EditStockProps {
  children: React.ReactNode;
  stock: stockProps;
}

const EditStock = ({ children, stock }: EditStockProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      name: stock.name,
      qty: stock.qty,
      qty_unit: stock.qty_unit,
      unit_price:stock.unit_price,
    },
  });

  const onSubmit = async (values: z.infer<typeof stockSchema>) => {
    try {
      console.log("Form values:", values);
      const data = await updateStock(
        stock.id,
        values.name,
        values.qty,
        values.qty_unit,
        values.unit_price,
      );
      if (data?.error) {
        toast.error(data?.error);
        console.log(data?.error);
      }
      location.reload();
      toast.success("Stock updated successfully!");
      console.log(values);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock.");
    }
    
      router.refresh();
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stock - {stock.name}</DialogTitle>
        </DialogHeader>
        <div className="w-full max-h-[60vh] overflow-y-auto">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity:</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="100" 
                       onChange={(e) => {
                        const inputValue = parseInt(e.target.value, 10) || 0;
                        field.onChange(Math.max(0, inputValue)); // Prevent negatives
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qty_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Unit:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit of measurement" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose asChild>
                <Button type={"submit"} variant={"default"} className="w-full">
                  Update Stock
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStock;
