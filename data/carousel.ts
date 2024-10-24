"use server";

import { createClient } from "@/utils/supabase/server";
import { carouselItemsProps } from "./types";

export const getSlides = async (): Promise<carouselItemsProps[]> => {
  const supabase = createClient();
  const { data: slider, error } = await supabase.from("slider").select("*");

  return slider as carouselItemsProps[];
};
