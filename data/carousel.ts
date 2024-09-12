"use server"

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getSlides = async () => {
  
  const { data: slider, error } = await supabase
  .from('slider')
  .select('image')
  
  return slider;
};


