import { cookies } from "next/headers";

import { Roboto, Roboto_Mono, Montserrat } from "next/font/google";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <SidebarProvider defaultOpen={defaultOpen} className={montserrat.className}>
      <AppSidebar name={user?.user_metadata.full_name} phone={user?.phone} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
