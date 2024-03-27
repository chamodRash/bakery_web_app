import { Button } from "../ui/button";
import Link from "next/link";

export const BackLink = ({ backLabel, backHref }) => {
  return (
    <Button variant={"link"} className={"mx-auto"}>
      <Link href={backHref} className="text-xs">
        {backLabel}
      </Link>
    </Button>
  );
};
