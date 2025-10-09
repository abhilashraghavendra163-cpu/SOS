"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { LogOut, LayoutDashboard, CalendarDays, CalendarCheck, Users, Building, FileArchive, Wallet, BarChart3 } from "lucide-react";
import { AppIcon } from "../components/AppIcon";
import { DashboardHeader } from "../components/DashboardHeader";
import { adminUser } from "@/lib/data";

const menuItems = [
  { href: "/admin?tab=attendance", label: "Attendance", icon: CalendarDays },
  { href: "/admin?tab=leaves", label: "Leave Requests", icon: CalendarCheck },
  { href: "/admin?tab=users", label: "User Management", icon: Users },
  { href: "/admin?tab=offices", label: "Offices", icon: Building },
  { href: "/admin?tab=documents", label: "Documents", icon: FileArchive },
  { href: "/admin?tab=payroll", label: "Payroll", icon: Wallet },
  { href: "/admin?tab=analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
                    data-active={pathname === '/admin' && !menuItems.some(item => window.location.search.includes(item.href.split('?tab=')[1]))}
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    data-active={typeof window !== 'undefined' && window.location.search.includes(item.href.split('?tab=')[1])}
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
