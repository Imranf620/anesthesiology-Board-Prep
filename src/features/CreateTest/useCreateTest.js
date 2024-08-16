import { useMutation } from "@tanstack/react-query";
import { createTest as createTestApi } from "../../services/apiTest";

export const useCreateTest = () => {
  const { mutate: createTest, status } = useMutation({
    mutationFn: (data) => createTestApi(data),
  });

  const isLoading = status === "pending";
  return { createTest, isLoading };
};
