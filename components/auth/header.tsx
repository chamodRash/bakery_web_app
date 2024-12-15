import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const AuthHeader = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <Image
        src={"/logo.jpg"}
        alt="logo"
        width={150}
        height={150}
        className="w-40"
      />
      <h3
        className={cn(
          "text-center text-zinc-900 text-2xl font-semibold underline",
          font.className
        )}>
        {label}
      </h3>
    </div>
  );
};
