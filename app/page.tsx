"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { getSessionUser } from "@/data/user";

import Navbar from "@/components/navbar";

export default function Home() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const getDbUser = async () => {
    const dbUser = await getSessionUser();

    setLoggedUser(dbUser as User | null);
    console.log(dbUser);
  };

  useEffect(() => {
    getDbUser();
  }, []);

  return (
    <div className="w-full">
      <Navbar user={loggedUser ? true : false} />
      <div className="w-10/12 mx-auto h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Dashboard {loggedUser ? loggedUser.phone : ""}
        </h1>
      </div>
    </div>
  );
}
