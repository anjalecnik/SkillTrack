import { useLocation } from "@remix-run/react";

export function useIsAdminRoute() {
  const location = useLocation();
  return location.pathname.includes("workspace-hub");
}
