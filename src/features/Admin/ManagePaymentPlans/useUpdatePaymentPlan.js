import { useMutation } from "@tanstack/react-query";
import { updatePaymentPlan } from "../../../services/apiAdmin";

export const useUpdatePaymentPlan = () => {
  const { mutate: updatePlan, status } = useMutation({
    mutationFn: (data) => updatePaymentPlan(data),
  });
  const isLoading = status === "pending";
  return { updatePlan, isLoading };
};
