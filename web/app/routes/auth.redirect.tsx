import { useEffect } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";

export default function Redirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const returnUrl = searchParams.get("returnUrl");

    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate("/");
    }
  }, [navigate, searchParams]);

  return null;
}
