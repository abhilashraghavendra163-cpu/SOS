"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { LogOut, LayoutDashboard, CalendarDays, CalendarCheck, Users, Building, FileArchive, Wallet, BarChart3, CalendarX2 } from "lucide-react";
import { AppIcon } from "../components/AppIcon";
import { DashboardHeader } from "../components/DashboardHeader";
import { adminUser } from "@/lib/data";

const menuItems = [
  { href: "/admin", tab: "attendance", label: "Attendance", icon: CalendarDays },
  { href: "/admin", tab: "leaves", label: "Leave Requests", icon: CalendarCheck },
  { href: "/admin", tab: "users", label: "User Management", icon: Users },
  { href: "/admin", tab: "offices", label: "Offices", icon: Building },
  { href: "/admin", tab: "holidays", label: "Holidays", icon: CalendarX2 },
  { href: "/admin", tab: "documents", label: "Documents", icon: FileArchive },
  { href: "/admin", tab: "payroll", label: "Payroll", icon: Wallet },
  { href: "/admin", tab: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <AppIcon className="w-8 h-8" />
            <span className="text-lg font-bold text-sidebar-foreground">
              AttendEase
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/admin">
                  <SidebarMenuButton
                    data-active={pathname === '/admin' && !currentTab}
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.tab}>
                <Link href={`${item.href}?tab=${item.tab}`}>
                  <SidebarMenuButton
                    data-active={currentTab === item.tab}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/">
            <SidebarMenuButton tooltip="Log Out">
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader user={adminUser} title="Admin Dashboard" />
        <main className="p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
