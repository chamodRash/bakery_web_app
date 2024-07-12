import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackLink = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant={"link"} className={"mx-auto"}>
      <Link href={href} className="text-xs">
        {label}
      </Link>
    </Button>
  );
};
