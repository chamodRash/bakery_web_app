"use server";

import { createClient } from "@/utils/supabase/server";
import { stockProps } from "./types";

export const getStock = async (): Promise<stockProps[]> => {
  const supabase = createClient();
  let { data: stock, error } = await supabase
    .from("stock")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return stock as stockProps[];
};

export const getAllStocksForChart = async () => {
  const supabase = createClient();
  let { data: stock, error } = await supabase.from("stock").select("name, qty");

  return stock;
};

export const addStock = async (item: {
  name: string;
  qty: number;
  qty_unit: string;
}) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("stock").insert([item]);
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to add cart item: ${message}`);
  }
};

export const updateStock = async (
  id: string,
  name: string,
  qty: number,
  qty_unit: string
) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("stock")
      .update({ name, qty, qty_unit })
      .eq("id", id);
    if (error) {
      return { error: `Failed to update stock item: ${error.message}` };
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { error: `Failed to update stock item: ${message}` };
  }
};

export const updateStockQuantity = async (id: string, qty: number) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("stock")
      .update({ qty })
      .match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to update stock item: ${message}`);
  }
};

export const deleteItems = async (id: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("stock").delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to delete stock items: ${message}`);
  }
};
