import { useMutation } from "@tanstack/react-query";
import { deletePromotion as deletePromotionApi } from "../../../services/apiAdmin";
export const useDeletePromotion = () => {
  const { mutate: deletePromotion, status } = useMutation({
    mutationFn: (data) => deletePromotionApi(data),
  });
  const isLoading = status === "pending";
  return { deletePromotion, isLoading };
};
