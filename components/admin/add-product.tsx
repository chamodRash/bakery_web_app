/*
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

interface AddCategoryProps {
  children: React.ReactNode;
  categories: CategoryItem[];
}

const AddProduct = ({ children, categories }: AddCategoryProps) => {
  const [productSlug, setProductSlug] = useState<string>("");

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
      qty: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
                    <FormLabel>Product Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Cake"
                        // value={field.name ? field.name : ""}
                        onChange={updateSlug}
                      />
                    </FormControl>
                    {/* <FormDescription /> 
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
                        placeholder="cake"
                        value={productSlug}
                        disabled
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
                    <FormDescription>
                      Upload a fair image that represent your new Product.
                    </FormDescription>
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
                    {/* <FormDescription /> 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
*/
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { productSchema } from "@/schemas";
import { supabase } from "@/lib/supabaseClient";  // Import Supabase client

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { addProduct } from "@/data/product";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface AddCategoryProps {
  children: React.ReactNode;
  categories: CategoryItem[];
}

const AddProduct = ({ children, categories }: AddCategoryProps) => {
  const [productSlug, setProductSlug] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileURL, setFileURL] = useState<string>("");

  const updateSlug = (e: any) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    setProductSlug(slug);
  };

  const router = useRouter();

  // Form setup with react-hook-form
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      qty: 0,
      slug: "",
      categorySlug: "",
      img: undefined,
    },
    
  });

  // Upload file to Supabase Storage
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from("product") // Bucket name
        .upload(filePath, file);

      if (uploadError) throw new Error(uploadError.message);

      // Get public URL
      const { data } = supabase.storage.from("product").getPublicUrl(filePath);
      if (!data.publicUrl) throw new Error("Failed to retrieve file URL.");

      setFileURL(data.publicUrl);
      return data.publicUrl;
    } catch (error: any) {
      toast.error("Image upload failed: " + error.message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Submit handler
  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      setIsLoading(true);

      // Upload image if provided
      let imageUrl = "";
      if (values.img) {
        imageUrl = await handleFileUpload(values.img); // Upload and get the URL
      }

      // Call addProduct with all values
      await addProduct({
        name: values.name,
        price: values.price,
        description: values.description,
        qty: Number(values.qty),
        slug: values.slug,
        status:values.status,
        categoryslug: values.categorySlug,
        image: imageUrl, // Pass uploaded image URL
      });
      console.log(values);

      toast.success("Product added successfully!");
      form.reset(); // Reset form fields
      setFileURL(""); // Clear file state
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add product."
      );
    } finally {
      setIsLoading(false);
      router.refresh();
    }
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
                    <FormLabel>Product Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Cake"
                        
                      />
                    </FormControl>
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
                        placeholder="cake"
                        
                        
                      />
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
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter quantity"
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Add options for 'low', 'medium', 'high' */}
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input {...field} 
                      type="number" // Ensure it's a number input
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image:</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        className="cursor-pointer block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-primary/80"
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          if (file) {
                            field.onChange(file); // Manually update react-hook-form with the selected file
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a fair image that represents your new product.
                    </FormDescription>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
              <p>Hello World  dddddddddddddddddddddddddddddddddddddd
                ddddddddddddddddddddddddddddddddddddddddddddddddd
                ddddddddddddddddddddddddddddddddddddddddddddddddd
                dddddddddddddddddddddddddddddddddddddddddddddddddd
                dddddddddddddddddddddddddddddddddddddddddddddddddd
                ddddddddddddddddddddddddddddddddddddddddddddddddddd
                ddddddddddddddddddddddddddddddddddddddddddddddddddd
                ddddddddddddddddddddddddddddddddddddddddddddddddddd






              </p>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
