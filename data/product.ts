
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface Category {
  id: number;
  img_url: string;
  name: string;
  description: string;
  products: string;
}

interface Product {
  id: number;
  image: string;
  name: string;
  categoryid: number;
  price: string;
  description: string;
}


export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase.from('category').select('*');
    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProducts = async (categoriesData: Category[]): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.from('product').select('*');
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    const enhancedProductData = (data || []).map((product) => {
      const category = categoriesData.find((cat) => cat.id === product.categoryid);
      return { ...product, categoryName: category ? category.name : 'Unknown' };
    });
    return enhancedProductData;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
}


