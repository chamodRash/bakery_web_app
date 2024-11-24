"use client";

import { stockProps } from "@/data/types";
import {useState} from "react";
import { deleteItems } from "@/data/stock"; 
import { toast } from "react-hot-toast"; 


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PenLine, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { UpdateStockQty } from "./update-stock-qty";
import EditStock from "./edit-stock";

interface StockTableProps {
  stock: stockProps[];
}


const StockTable = ({ stock }: StockTableProps) => {
  const [loading, setLoading] = useState(false);

  const deleteStock = async (id: string) => {
    try {
      setLoading(true);
      await deleteItems(id); 
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the item");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Table>
      <TableCaption>Stocks</TableCaption>
      <TableHeader>
        <TableHead>Name</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead>Unit</TableHead>
        <TableHead>Actions</TableHead>
      </TableHeader>
      <TableBody>
        {stock.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell>{item.qty_unit}</TableCell>
            <TableCell>
              <div className="w-full flex items-center gap-x-5">
                <UpdateStockQty stock={item}>
                  <Button variant={"outline"} size={"icon"}>
                    <Plus size={18} />
                  </Button>
                </UpdateStockQty>
                <EditStock stock={item}>
                  <Button variant={"default"} size={"icon"}>
                    <PenLine size={16} />
                  </Button>
                </EditStock>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"} size={"icon"}>
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete selected Product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteStock(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockTable;
