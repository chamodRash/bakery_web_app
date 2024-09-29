"use client";

import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

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
      <body>
        <Navbar user={loggedUser} />
        <div className="my-16">{children}</div>
      </body>
    </html>
  );
}
