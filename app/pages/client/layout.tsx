"use client";
import { useRoleProtection } from "@/app/Services/useRoleProtection";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useRoleProtection(["estudiante"], "/pages/login?error=client-required");
  return <>{children}</>;
}
