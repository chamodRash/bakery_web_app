import { createClient } from '@/utils/supabase/client'; 


const supabase=createClient();
// Function to fetch cart items
export const fetchCartItems = async () => {
  try {
    const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      productid,
      quantity,
      total,
      status,
      product (id,name, price,image)
    `);
  
    if (error) throw error;
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to fetch cart items: ${message}`);
  }
};


export const addItemToCart = async (item: { userid: string; productid: number; quantity: number; total: number; status: boolean }) => {
  try {
    const { data, error } = await supabase.from('cart').insert([item]);
    if (error) throw error;
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to add cart item: ${message}`);
  }
};



// Function to delete an item from the cart
export const deleteItems = async (id: number) => {
  try {
    const { data, error } = await supabase.from('cart').delete().match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to delete cart items: ${message}`);
  }
};

export const updateItemInCart = async (id: number, quantity: number, total: number) => {
  try {
    const { data, error } = await supabase.from('cart').update({ quantity, total }).match({ id });
    if (error) throw error;
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to update cart item: ${message}`);
  }
};

          