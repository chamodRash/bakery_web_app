"use server";

import { createClient } from "@/utils/supabase/server";
import { assert } from "console";

const supabase = createClient();

export const getAllProducts = async () =>{    
    let { data: product, error } = await supabase
    .from('product')
    .select('*');

    return product;
}

export const getAllCategory = async () =>{
    
    let { data: category, error } = await supabase
    .from('category')
    .select('*');

    return category;
}

export const getCategoryById = async (id: number) =>{
    let { data: category, error } = await supabase
    .from('category')
    .select('*')
    .eq('id' , id);

    return category;
}

export const getProductByCategory = async (categoryId: number) =>{
    let { data: products, error } = await supabase
    .from('product')
    .select('*')
    .eq('categoryid' , categoryId);

    return products;
}

