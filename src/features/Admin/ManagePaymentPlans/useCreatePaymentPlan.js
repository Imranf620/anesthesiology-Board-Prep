import { useMutation } from "@tanstack/react-query";
import { createPaymentPlan } from "../../../services/apiAdmin";

export const useCreatePaymentPlan = () => {
  const { mutate: createPlan, status } = useMutation({
    mutationFn: (data) => createPaymentPlan(data),
  });
  const isLoading = status === "pending";
  return { createPlan, isLoading };
};
