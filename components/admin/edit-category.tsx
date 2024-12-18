import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState,useEffect } from "react";
import { addCategorySchema } from "@/schemas";
import { updateCategory } from "@/data/product";

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
import { CategoryItem } from "@/data/types";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { getImageURL } from "@/data/product";
interface AddCategoryProps {
  children: React.ReactNode;
  category: CategoryItem;
}

const EditCategory = ({ children, category }: AddCategoryProps) => {
  const supabase = createClient(); // Supabase client for image upload
  const [categorySlug, setCategorySlug] = useState<string>(category.slug);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileURL, setFileURL] = useState<string>(category.img_url || "");
  const[imgUrl,setImgUrl]=useState<string>("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageURL(category.id);
      setImgUrl(url || ""); // Set the image URL in the state
    };

    fetchImageUrl();
  }, [category.id]);

  // Function to generate slug dynamically
  const router=useRouter();
  const updateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    setCategorySlug(slug);
    form.setValue("slug", slug); // Update the form value
  };
  
  // React Hook Form setup
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: category.slug,
      
    },
  });

  // File upload function to Supabase
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("category")
        .upload(filePath, file);

      if (uploadError) throw new Error(uploadError.message);

      // Get public URL of uploaded file
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

  // Submit handler for updating the category
  const onSubmit = async (values: z.infer<typeof addCategorySchema>) => {
    try {
      setIsLoading(true);

      let imageUrl = fileURL; // Start with the current image URL

      // Check if a new file is uploaded
      if (values.img instanceof File) {
        imageUrl = await handleFileUpload(values.img); // Upload new image and get URL
      }

      // Call API function to update category
      await updateCategory(
        category.id, // Pass the category ID for update
        values.name,
        values.description,
        values.slug,
        imageUrl,
      );

      toast.success("Category updated successfully!");
      form.reset(); // Reset the form
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update category."
      );
    } finally {
      setIsLoading(false);
      router.refresh();
    }
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
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
                        placeholder="Cake"
                        onChange={(e) => {
                          field.onChange(e); // Keep React Hook Form behavior
                          updateSlug(e); // Call your custom function
                        }}
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
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Image:</FormLabel>
                  {/* Image Preview */}
                  {fileURL && (
                    <div className="mb-4">
                      <img
                        src={fileURL}
                        alt="Category Preview"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onChange(file); // Update form state
                      }}
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
              <Button type="submit">Edit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
