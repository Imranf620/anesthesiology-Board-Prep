import { useMutation } from "@tanstack/react-query";
import { loginGoogle } from "../../services/apiAuth";

export const useLoginWithGoogle = () => {
  const { mutate: googleLogin, status } = useMutation({
    mutationFn: (data) => loginGoogle(data),
  });
  const isLoading = status === "pending";
  return { googleLogin, isLoading };
};
