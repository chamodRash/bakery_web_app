import { createClient } from "@/utils/supabase/client";

export const CategoryBar = async () => {
  const supabase = createClient();

  let { data: category, error } = await supabase.from("category").select("*");

  return <div>category bar</div>;
};
