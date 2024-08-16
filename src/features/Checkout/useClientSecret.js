import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getClientSecret } from "../../services/apiUsers";

export const useClientSecret = () => {
  const { plan } = useParams();
  const [searchParams] = useSearchParams();
  const promoCode = searchParams.get("promo-code") || undefined;
  const { data: clientSecret, isLoading } = useQuery({
    queryFn: () =>
      getClientSecret({
        username: localStorage.getItem("username"),
        Plan: plan,
        Code: promoCode,
      }),
    queryKey: ["client-secret"],
  });

  return { clientSecret, isLoading };
};
