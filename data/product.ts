"use server";

import { createClient } from "@/utils/supabase/server";
import { assert } from "console";
import { CategoryItem, DataItem } from "./types";

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
    .eq("slug", slug);

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

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
