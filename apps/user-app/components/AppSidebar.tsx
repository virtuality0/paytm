import { Home, Send, DollarSign } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@repo/ui";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transfer",
    url: "/dashboard/transfers",
    icon: DollarSign,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Send,
  },
];

export default function AppSidebar() {
  return (
    <SidebarProvider className="w-[25%]">
      <Sidebar className="w-[25%] border-none bg-white text-black">
        <SidebarContent className="bg-black-100">
          <SidebarGroup className="flex flex-col gap-6">
            <SidebarGroupLabel className="text-black font-bold text-xl">
              PayWise
            </SidebarGroupLabel>
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
      </Sidebar>
    </SidebarProvider>
  );
}
