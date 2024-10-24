"use server";

import FilteredProductsSection from "@/components/filterProductSection";
import { getProductsByCategorySlug } from "@/data/product";
import { createClient } from "@/utils/supabase/server";

const CategoryPage = async (context: any) => {
  const supabase = createClient();
  const { category: categorySlug } = context.params;
  const products = await getProductsByCategorySlug(categorySlug);

  return (
    <div className="w-full min-h-screen flex items-center">
      <FilteredProductsSection items={products} categoryName={categorySlug} />
    </div>
  );
};

export default CategoryPage;
