import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteFeedback } from "../../../services/feedback";
import { useGetFeedback } from "../ManageFeedback/useGetFeedback.js";

export const useDeleteFeedback = () => {
  const { refetch } = useGetFeedback(); // Get refetch function

  const mutation = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(feedbackId),
    onError: (error) => {
      toast.error(`Error: ${error.response?.data?.Error || "An error occurred"}`);
    },
    onSuccess: (data) => {
      toast.success(`Success: ${data.message || "Feedback deleted successfully"}`);
      refetch(); // Refetch data after successful deletion
    },
  });

  return mutation;
};
