import { useMutation } from "@tanstack/react-query";
import { saveTest } from "../../services/apiTest";

export const useSaveQuiz = () => {
  const { mutate: saveQuiz, status } = useMutation({
    mutationFn: (data) => saveTest(data),
  });
  const isLoading = status === "pending";
  return { saveQuiz, isLoading };
};
