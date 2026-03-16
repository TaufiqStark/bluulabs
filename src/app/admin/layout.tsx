import { ReactNode } from "react";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard - taufiq.",
  description: "Portfolio CMS Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminThemeProvider defaultTheme="dark">
      <AdminShell>{children}</AdminShell>
    </AdminThemeProvider>
  );
}
