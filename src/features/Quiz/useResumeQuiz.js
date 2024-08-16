import { useMutation } from "@tanstack/react-query";
import { resumeTest } from "../../services/apiTest";

export const useResumeQuiz = () => {
  const { mutate: resumeQuiz, status } = useMutation({
    mutationFn: (data) => resumeTest(data),
  });
  const isLoading = status === "pending";
  return { resumeQuiz, isLoading };
};
