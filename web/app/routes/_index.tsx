import { requireNoAuth } from "~/util";
import { LandingPage } from "~/components/features";

export const clientLoader = async () => {
  requireNoAuth();
  return null;
};

export default function Landing() {
  return <LandingPage />;
}
