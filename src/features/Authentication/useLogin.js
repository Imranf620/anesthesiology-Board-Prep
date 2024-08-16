import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
  const { mutate: login, status } = useMutation({
    mutationFn: (data) => loginApi(data),
  });
  const isLoading = status === "pending";

  return { login, isLoading };
};
