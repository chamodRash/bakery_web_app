"use server";

import { createClient } from "@/utils/supabase/server";
import { assert } from "console";

const supabase = createClient();

export const getAllProducts = async () => {
  let { data: product, error } = await supabase.from("product").select("*");

  return product;
};

export const getAllProductsForChart = async () => {
  let { data: product, error } = await supabase
    .from("product")
    .select("name, qty");

  return product;
};

export const getAllCategory = async () => {
  let { data: category, error } = await supabase.from("category").select("*");

  return category;
};

export const getProductById = async (id: number) => {
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
  let { data: category, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", id);

  return category;
};

export const getProductByCategory = async (categoryId: number) => {
  let { data: products, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryid", categoryId);

  return products;
};

export const getProductsByCategory = async (categoryid: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryid", categoryid);

  return data;
};

export const getProductsBySearch = async (search: string | undefined) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .ilike("name", `%${search}%`);

  return data;
};
