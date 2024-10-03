import { createClient } from '@/utils/supabase/client';

const supabase=createClient();

export const fetchProductDetails = async (productId: number) => {
  try {
    const { data, error } = await supabase
      .from('product')
      .select('id, name, price,image')
      .eq('id', productId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to fetch product details: ${message}`);
  }
};
