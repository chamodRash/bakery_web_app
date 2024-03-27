"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthHeader } from "./header";
import { BackLink } from "./back-link";

export const CardWrapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
}) => {
  return (
    <Card className={"w-[350px] shadow-md"}>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackLink backLabel={backBtnLabel} backHref={backBtnHref} />
      </CardFooter>
    </Card>
  );
};
