import { useQuery } from "@tanstack/react-query";
import { getFeedback } from "../../../services/feedback";

export const useGetFeedback = () => {
  const {
    data: feedback,
    isLoading,
    isError,
    refetch, // Include the refetch function
  } = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: () => getFeedback({ username: localStorage.getItem("username") }),
  });

  return { feedback, isLoading, isError, refetch }; // Return refetch
};
