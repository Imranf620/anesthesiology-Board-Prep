import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../../services/apiQuestions";

export const useGetAllQuestions = () => {
  const {
    data: allQuestions,

    isFetching,
  } = useQuery({
    queryKey: ["all-questions"],
    queryFn: getAllQuestions,
    enabled: !!localStorage.getItem("username"),
  });
  return { allQuestions, isLoading: isFetching };
};
