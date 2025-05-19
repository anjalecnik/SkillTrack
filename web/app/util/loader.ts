import { SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";

export function useTypedRouteLoaderData<T>(route: string) {
  return useRouteLoaderData(route) as SerializeFrom<T> | undefined;
}
