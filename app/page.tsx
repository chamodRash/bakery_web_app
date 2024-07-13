import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/navbar";
import LogoutBtn from "@/components/auth/logout-btn";
import { Button } from "@/components/ui/button";
import { getVerificationTokenByToken } from "@/data/token";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  // if (error) {
  //   redirect(`/error?message=${error.message}`);
  //   console.log(error);
  // }

  return (
    <div className="w-full">
      <Navbar user={data.user} />
      <div className="w-10/12 mx-auto h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Dashboard {data.user ? `+${data.user.phone}` : ""}
        </h1>
      </div>
    </div>
  );
}
