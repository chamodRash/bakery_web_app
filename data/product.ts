"use server";

import { createClient } from "@/utils/supabase/server";
import { assert } from "console";
import { CategoryItem, DataItem } from "./types";



const supabase=createClient();

export const getAllProducts = async (): Promise<DataItem[]> => {
  const supabase = createClient();
  let { data: products, error } = await supabase.from("product").select("*");

  return products as DataItem[];
};

export const getAllProductsForChart = async () => {
  const supabase = createClient();
  let { data: product, error } = await supabase
    .from("product")
    .select("name, qty");

  return product;
};

export const getAllCategory = async (): Promise<CategoryItem[]> => {
  const supabase = createClient();
  let { data: category, error } = await supabase
    .from("category")
    .select("id, name, description, img_url, slug");

  return category as CategoryItem[];
};

export const getProductById = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id);

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
};

export const getProductBySlug = async (slug: string | null) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
};

export const getCategoryById = async (id: number) => {
  const supabase = createClient();
  let { data: category, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", id);

  return category;
};

export const getProductByCategory = async (categoryId: number) => {
  const supabase = createClient();
  let { data: products, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryid", categoryId);

  return products;
};

export const getProductsByCategorySlug = async (
  categoryslug: string
): Promise<DataItem[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryslug", categoryslug);

  return data as DataItem[];
};

export const getProductsBySearch = async (search: string | undefined) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .ilike("name", `%${search}%`);

  return data;
};



export const addProduct = async (item: {
  name:string,
  price:number,
  description:string,
  slug:string,
  image:string,
  status:string,
  categoryslug:string,
  qty:number;
 
}) => {
  try {
    const { data, error } = await supabase.from("product").insert([item]);
    console.log("Supabase response:", data, error);
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to add Product item: ${message}`);
  }
};
export const updateProduct= async (
  id:number,
  name:string,
  price:number,
  description:string,
  slug:string,
  categoryslug:string,

) => {console.log('Updating product:', { id, name, price, description, categoryslug,slug });
  try {
    const { data, error } = await supabase
      .from("product")
      .update({ name,price,description,slug,categoryslug})
      .match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to update product item: ${message}`);
  }
};

export const updateProductQuantity = async (
  id: number,
  qty: number,
) => {
  try {
    const { data, error } = await supabase
      .from("product")
      .update({ qty})
      .match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to update Product item: ${message}`);
  }
};


export const deleteProduct = async (id: number) => {
  try {
    const { data, error } = await supabase.from("product").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to delete product items: ${message}`);
  }
};

export const addCategory = async (item: {
  name:string,
  description:string,
  slug:string,
  img_url:string,
 
}) => {
  try {
    const { data, error } = await supabase.from("category").insert([item]);
    console.log("Supabase response:", data, error);
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to add Category item: ${message}`);
  }
};

export const getImageURL = async (id:number)=> {

  try {
    // Query the database for a specific category's img_url
    const { data, error } = await supabase
      .from("category") // Table name
      .select("img_url") // Select only the img_url field
      .eq("id", id) // Filter by the specific ID
      .single(); // Ensure only one record is returned

    if (error) {
      console.error("Error fetching image URL:", error.message);
    
    }

    return data?.img_url || null; // Return the img_url or null if not found
  } catch (error) {
    console.error("Unexpected error fetching image URL:", error);
    
  }
};

  

export const updateCategory = async (
  id: number,
  name:string,
  description:string,
  slug:string,
  img_url:string,
) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .update({ name,description,slug,img_url})
      .eq( "id",id );
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to update Category item: ${message}`);
  }
};


export const deleteCategory = async (id: number) => {
  try {
    const { data, error } = await supabase.from("category").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to delete category items: ${message}`);
  }
};

