"use client";
import { useRoleProtection } from "@/app/Services/useRoleProtection";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useRoleProtection(["admin"], "/pages/login?error=admin-required");
  return <>{children}</>;
}
