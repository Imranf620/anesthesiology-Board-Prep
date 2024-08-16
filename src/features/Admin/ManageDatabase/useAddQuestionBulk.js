import { useMutation } from "@tanstack/react-query";
import { addQuestionBulk } from "../../../services/apiAdmin";

export const useAddQuestionBulk = () => {
  const { mutate: addQuestions, status } = useMutation({
    mutationFn: (data) => addQuestionBulk(data),
  });

  const isLoading = status === "pending";
  return { addQuestions, isLoading };
};
