import { useQuery } from "@tanstack/react-query";
import { getLogFilesUrl } from "../../../services/apiAdmin";

export const useGetLogFilesUrl = () => {
  const {
    data: logFilesUrl,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-log-files"],
    queryFn: getLogFilesUrl,
  });

  return {
    logFilesUrl,
    isLoading,
    isError,
  };
};
