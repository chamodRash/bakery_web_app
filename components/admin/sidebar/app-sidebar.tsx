"use client";

import {
  HandCoins,
  PackageSearch,
  Layers3,
  UsersRound,
  TrendingUp,
  ChefHat,
} from "lucide-react";
import {
  IconBrandTabler,
  IconSettings,
  IconArrowLeft,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: IconBrandTabler,
  },
  {
    title: "POS",
    url: "/admin/pos",
    icon: HandCoins,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: PackageSearch,
  },
  {
    title: "Stock",
    url: "/admin/stock",
    icon: Layers3,
  },
  {
    title: "Charts",
    url: "/admin/charts",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: IconSettings,
  },
];

const team = {
  name: "Treats Bakery",
  logo: ChefHat,
  plan: "Bakery Web Application",
};

export function AppSidebar({
  name,
  phone,
}: {
  name: string;
  phone: string | undefined;
}) {
  const router = useRouter();
  const user = {
    name: name,
    phone: phone,
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader onClick={() => router.push("/admin")}>
        <TeamSwitcher teams={team} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
