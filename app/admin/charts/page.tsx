"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ChartsPage = () => {
  const showToast = () => {
    toast.success("Hello world!");
    console.log("clicked");
  };

  return (
    <div>
      <Button onClick={() => showToast()}>Click me</Button>
    </div>
  );
};

export default ChartsPage;
