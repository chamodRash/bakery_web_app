"use server";

import FilteredProductsSection from "@/components/filterProductSection";
import { createClient } from "@/utils/supabase/server";

const CategoryPage = async (context: any) => {
  const supabase = createClient();
  const { category: categorySlug } = context.params;
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryslug", categorySlug);

  return (
    <div className="w-full min-h-screen flex items-center">
      <FilteredProductsSection items={data} categoryName={categorySlug} />
    </div>
  );
};

export default CategoryPage;
