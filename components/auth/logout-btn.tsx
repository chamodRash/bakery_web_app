"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutBtn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    // defaults to the global scope
    await supabase.auth.signOut();

    // sign out from the current session only
    await supabase.auth.signOut({ scope: "local" });

    router.push("/login");
  };

  return (
    <span onClick={logout} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutBtn;
