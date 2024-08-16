import { useQuery } from "@tanstack/react-query";
import { getPaymentPlans } from "../../../services/apiAdmin";

export const useGetPaymentPlans = () => {
  const {
    data: paymentPlans,
    isLoading,
    isError,
  } = useQuery({
    queryFn:()=> getPaymentPlans({username:localStorage.getItem('username')}),
    queryKey: ["payment-plans"],
  });

  return { paymentPlans, isLoading, isError };
};
