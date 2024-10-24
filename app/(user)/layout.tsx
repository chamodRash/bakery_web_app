"use client";

import { Merienda } from "next/font/google";

import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const merienda = Merienda({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [loggedUser, setLoggedUser] = useState<boolean>(false);

  const getDbUser = useCallback(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user?.is_anonymous === true || user === null || error) {
      setLoggedUser(false);
      return;
    }
    setLoggedUser(true);
  }, [supabase]);

  useEffect(() => {
    getDbUser();
  }, [getDbUser, loggedUser]);

  return (
    <html lang="en">
      <body className={merienda.className}>
        <Navbar user={loggedUser} />
        <div className="pt-24 bg-[#EEF5FF]">{children}</div>
      </body>
    </html>
  );
}
