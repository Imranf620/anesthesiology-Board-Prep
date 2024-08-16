import { useMutation } from "@tanstack/react-query";
import { submitTest } from "../../services/apiTest";

export const useSubmitQuiz = () => {
  const { mutate: submitQuiz, status } = useMutation({
    mutationFn: (data) => submitTest(data),
  });
  const isLoading = status === "pending";
  return { submitQuiz, isLoading };
};
