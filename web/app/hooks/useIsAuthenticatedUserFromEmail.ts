import { useSearchParams } from "@remix-run/react";

export function useIsAuthenticatedUserFromEmail(
  paramFromUrl: string,
  workspaceUserId: number | undefined
) {
  const [searchParams] = useSearchParams();
  const userIdFromUrl = searchParams.get(paramFromUrl);

  if (!userIdFromUrl) return true;

  if (!workspaceUserId) return false;

  return String(workspaceUserId) === userIdFromUrl;
}
