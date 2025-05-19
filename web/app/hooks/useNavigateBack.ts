import { useNavigate } from "@remix-run/react";

export function useNavigateBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
