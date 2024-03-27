"use client";

import { useRouter } from "next/navigation";

const LoginBtn = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };

  if (mode === "modal") {
    return <span>TODO: implement modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginBtn;
