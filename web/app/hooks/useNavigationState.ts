import { useNavigation } from "@remix-run/react";
import { NavigationState } from "~/types";

export function useNavigationState() {
  const navigationState = useNavigation().state;
  const isLoading =
    navigationState === NavigationState.Submitting ||
    navigationState === NavigationState.Loading;

  return { navigationState, isLoading };
}
