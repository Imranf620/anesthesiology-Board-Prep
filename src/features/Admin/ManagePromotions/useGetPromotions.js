import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../../../services/apiAdmin";

export const useGetPromotions = () => {
  const {
    data: promotions,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getPromotions,
    queryKey: ["admin-promotions"],
  });

  return { promotions, isLoading, isError };
};
