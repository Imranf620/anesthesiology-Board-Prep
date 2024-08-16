import { useQuery } from "@tanstack/react-query";
import { getUserResults } from "../../services/apiResults";

export const useGetResults = () => {
  const username = localStorage.getItem("username");
  const { data: results, isLoading } = useQuery({
    queryKey: ["user-results"],
    queryFn: () => getUserResults(username),
  });

  return { results, isLoading };
};
