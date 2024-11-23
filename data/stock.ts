"use server";

import { createClient } from "@/utils/supabase/server";
import { stockProps } from "./types";

export const getStock = async (): Promise<stockProps[]> => {
  const supabase = createClient();
  let { data: stock, error } = await supabase.from("stock").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return stock as stockProps[];
};
