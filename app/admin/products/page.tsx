"use server";

import CategoryPanel from "@/components/admin/category-panel";
import ProductsPanel from "@/components/admin/products-panel";
import { Separator } from "@/components/ui/separator";
import {
  getAllCategory,
  getAllProducts,
  getProductByCategory,
  getProductsByCategorySlug,
} from "@/data/product";

interface AdminProductPageProps {
  searchParams: {
    catSlug: string;
  };
}

const AdminProductPage = async ({ searchParams }: AdminProductPageProps) => {
  let catSlug = searchParams.catSlug;
  const categories = await getAllCategory();
  catSlug = !catSlug ? categories[0].slug : catSlug;
  const products = await getProductsByCategorySlug(catSlug);

  return (
    <div className="w-full h-screen">
      <div className="p-5 h-11/12 w-full">
        <div className="w-full grid grid-cols-4 ">
          <div>
            <CategoryPanel category={categories} catSlug={catSlug} />
          </div>
          <div className="col-span-3">
            <ProductsPanel categories={categories} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
