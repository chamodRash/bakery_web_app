import { Merienda } from "next/font/google";

import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "react-hot-toast";

const merienda = Merienda({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  let loggedUser = true;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user?.is_anonymous === true || user === null || error) {
    loggedUser = false;
  }

  return (
    <html lang="en">
      <body className={merienda.className}>
        <Navbar user={loggedUser} />
        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}
