import Navbar from "@/components/navbar";
import ProductPage from "@/components/product/Product";
import { createClient } from "@/utils/supabase/client";

export default async function Product() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="w-full">
      <Navbar user={data.user} />
      <ProductPage />
    </div>
  );
}

