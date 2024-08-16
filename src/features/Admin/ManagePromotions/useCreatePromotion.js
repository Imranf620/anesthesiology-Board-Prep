import { useMutation } from "@tanstack/react-query";
import { createPromotion as createPromotionApi } from "../../../services/apiAdmin";

export const useCreatePromotion = () => {
  const { mutate: createPromotion, status } = useMutation({
    mutationFn: (data) => createPromotionApi(data),
  });
  const isLoading = status === "pending";
  return { createPromotion, isLoading };
};
