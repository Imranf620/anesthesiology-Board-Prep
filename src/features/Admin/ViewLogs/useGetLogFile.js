import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getLogFile } from "../../../services/apiAdmin";

export const useGetLogFile = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("logfileUrl");
  const {
    data: logFile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [url],
    queryFn: () => getLogFile(url),
    enabled: !!url,
  });

  return { logFile, isLoading, isError };
};
