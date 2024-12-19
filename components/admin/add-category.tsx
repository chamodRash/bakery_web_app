import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { addCategorySchema } from "@/schemas";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { addCategory } from "@/data/product";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import {useRouter} from "next/navigation";

interface AddCategoryProps {
  children: React.ReactNode;
}

const AddCategory = ({ children }: AddCategoryProps) => {
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileURL, setFileURL] = useState<string>("");

  const supabase=createClient();

  const updateSlug = (e: any) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    setCategorySlug(slug);
    form.setValue("slug",slug);
  };
  const router = useRouter();

  // Form setup with react-hook-form
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
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
        .from("category") // Bucket name
        .upload(filePath, file);

      if (uploadError) throw new Error(uploadError.message);

      // Get public URL
      const { data } = supabase.storage.from("category").getPublicUrl(filePath);
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
  const onSubmit = async (values: z.infer<typeof addCategorySchema>) => {
    try {
      setIsLoading(true);

      // Upload image if provided
      let imageUrl = "";
      if (values.img) {
        imageUrl = await handleFileUpload(values.img); // Upload and get the URL
      }

      // Call addProduct with all values
      await addCategory({
        name: values.name,
        description: values.description,
        slug: values.slug,
        img_url: imageUrl, 
      });
      console.log(values);

      toast.success("Category added successfully!");
      form.reset(); // Reset form fields
      setFileURL(""); // Clear file state
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add category."
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
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Enter the details of your new category.
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
                    <FormLabel>Category Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pastries"
                        // value={field.name ? field.name : ""}
                      
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
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
                    {/* <FormDescription /> */}
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="cake"
                        value={categorySlug}
                        onChange={(e) => {
                          // Update slug directly when name changes or if user changes slug
                          const slug = e.target.value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
                          setCategorySlug(slug); // Update state dynamically
              
                          // Make sure React Hook Form also updates the value (this is important if slug is part of the form)
                          field.onChange(e); // Ensures RHF updates the value
                        }}
                        
                      />
                    </FormControl>
                    <FormDescription />
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

export default AddCategory;
