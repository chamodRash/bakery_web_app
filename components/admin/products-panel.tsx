"use client";

import Image from "next/image";

import { CategoryItem, DataItem } from "@/data/types";
import { Button } from "../ui/button";
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
import EditProduct from "./edit-product";
import { UpdateProductQty } from "./update-product-qty";
import AddProduct from "./add-product";
import { deleteProduct } from "@/data/product";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation"

interface productsPanelProps {
  products: DataItem[];
  categories: CategoryItem[];
}

const ProductsPanel = ({ products, categories }: productsPanelProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCheckedCategories = async (productID: number) => {
   
      try {
        setIsLoading(true);
        const deletedProduct = await deleteProduct(productID);
        
        toast.success("Product deleted successfully!");
        router.refresh(); 
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete product."
        );
      } finally {
        setIsLoading(false);
      }
    
  };

  return (
    <div className="w-full pl-5">
      <div className="w-full px-5 flex items-center justify-between">
        <h3 className="font-bold text-lg text-zinc-700">Products</h3>
        <AddProduct categories={categories}>
          <Button>Add Product</Button>
        </AddProduct>
      </div>
      <div className="w-full mt-4 overflow-auto">
        <Table>
          <TableCaption>Products</TableCaption>
          <TableHeader>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-full flex items-center gap-x-3">
                    <Image
                      src={product.image}
                      width={100}
                      height={100}
                      alt={product.name}
                      className="w-14 h-14 rounded-sm object-center object-cover"
                    />
                    <p>{product.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>Rs. {product.price.toFixed(2)}/=</p>
                </TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <div className="w-full flex items-center gap-x-5">
                    <UpdateProductQty product={product}>
                      <Button variant={"outline"} size={"icon"}>
                        <Plus size={18} />
                      </Button>
                    </UpdateProductQty>
                    <EditProduct product={product} categories={categories}>
                      <Button variant={"default"} size={"icon"}>
                        <PenLine size={16} />
                      </Button>
                    </EditProduct>
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
                          <AlertDialogAction
                            onClick={() => deleteCheckedCategories(product.id)}>
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
      </div>
    </div>
  );
};

export default ProductsPanel;
