import { useMutation } from "@tanstack/react-query";
import { deletePaymentPlan } from "../../../services/apiAdmin";

export const useDeletePaymentPlan = () => {
  const { mutate: deletePlan, status } = useMutation({
    mutationFn: (data) => deletePaymentPlan(data),
  });
  const isLoading = status === "pending";
  return { deletePlan, isLoading };
};
