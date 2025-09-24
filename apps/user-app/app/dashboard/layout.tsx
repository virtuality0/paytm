import AppSidebar from "@/components/AppSidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />

      <div className="flex flex-col grow">
        <header className="flex justify-end items-center px-4 py-3 border-b border-gray-700">
          <UserButton />
        </header>

        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
