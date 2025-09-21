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
    url: "#",
    icon: Home,
  },
  {
    title: "Transfer",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Transactions",
    url: "#",
    icon: Send,
  },
];

export default function AppSidebar() {
  return (
    <SidebarProvider className="w-[25%]">
      <Sidebar className="w-[25%] border-none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white font-bold text-xl">
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
