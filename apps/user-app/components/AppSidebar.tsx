"use client";
import {
  Card,
  CardContent,
  CardTitle,
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@repo/ui";
import { UserButton, useUser } from "@clerk/nextjs";

function AppSidebar() {
  const { user } = useUser();
  return (
    <SidebarProvider className="px-4 py-2">
      <Sidebar className="w-[30%]">
        <SidebarHeader>
          <div className="text-white text-sm flex gap-4 items-center">
            <UserButton />
            <div>
              <p>User</p>
              <p>{user?.fullName}</p>
            </div>
          </div>
        </SidebarHeader>
      </Sidebar>
    </SidebarProvider>
  );
}

export default AppSidebar;
