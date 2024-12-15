"use server";

import {
  getAllCategory,
  getProductBySlug,
  getProductsByCategorySlug,
} from "@/data/product";

import CategoryButtonSection from "@/components/categoryButton-section";
import ProductsSection from "@/components/products-section";
import ProductDetailsSection from "@/components/product-details-section";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = params;

  const categories = await getAllCategory();
  const productItem = await getProductBySlug(slug);
  const categoryProducts = await getProductsByCategorySlug(
    productItem.categoryslug
  );

  return (
    <div className="w-full pt-10">
      <ProductDetailsSection product={productItem} />

      <CategoryButtonSection categoryItems={categories} />

      <ProductsSection items={categoryProducts} />
    </div>
  );
}
