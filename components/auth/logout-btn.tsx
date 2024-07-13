"use client";

import { logout } from "@/actions/logout";
import React from "react";

const LogoutBtn = ({ children }: { children: React.ReactNode }) => {
  const onclick = () => {
    logout();
  };

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutBtn;
