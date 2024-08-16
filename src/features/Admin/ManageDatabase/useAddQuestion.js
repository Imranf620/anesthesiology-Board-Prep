import { useMutation } from "@tanstack/react-query";
import { addQuestionToDB } from "../../../services/apiAdmin";

export const useAddQuestion = () => {
  const { mutate: addQuestion, status } = useMutation({
    mutationFn: (data) => addQuestionToDB(data),
  });

  const isLoading = status === "pending";
  return { addQuestion, isLoading };
};
