import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { productSchema } from "@/schemas";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryItem, DataItem } from "@/data/types";
import Image from "next/image";
import { Label } from "../ui/label";
import { updateProduct } from "@/data/product";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface AddCategoryProps {
  children: React.ReactNode;
  product: DataItem;
  categories: CategoryItem[];
}

const EditProduct = ({ children, product, categories }: AddCategoryProps) => {
  //   const [categoryName, setCategoryName] = useState<string>("");
  const [productSlug, setProductSlug] = useState<string>(product.slug);
  const [uploadNewImg, setUploadNewImg] = useState<boolean>(false);
  const router=useRouter();

  const updateSlug = (e: any) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    setProductSlug(slug);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      slug: product.slug,
      categorySlug: product.categoryslug,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      await updateProduct(
        product.id, 
        values.name,
        values.price,
        values.description,
        values.slug,
        values.categorySlug
      );
      toast.success("Stock updated successfully!");

    
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock.");
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger className="" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="w-full h-60vh overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name:</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={updateSlug} />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={productSlug}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!uploadNewImg && (
                <div className="w-full gap-y-2">
                  <Label>Current Image:</Label>
                  <div className="w-full flex items-center gap-x-8">
                    <Image
                      src={product.image}
                      width={100}
                      height={100}
                      alt={product.name}
                      className="w-20 h-20 rounded-sm object-center object-cover"
                    />
                    <Button
                      onClick={() => setUploadNewImg(true)}
                      variant="outline"
                      size="sm">
                      Upload New Image
                    </Button>
                  </div>
                </div>
              )}
              {uploadNewImg && (
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image:</FormLabel>
                      <FormControl>
                        <input
                          {...form}
                          type="file"
                          className="cursor-pointer block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-primary/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter a brief description for your new category."
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-40">
                Edit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
