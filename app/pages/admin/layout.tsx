"use client";
import { useRoleProtection } from "@/app/Services/useRoleProtection";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Comentado para testing - evitar redirección al login
  useRoleProtection(["admin"], "/pages/login?error=admin-required");
  return <>{children}</>;
}
