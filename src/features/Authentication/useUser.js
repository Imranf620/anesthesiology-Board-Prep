import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../../services/apiAuth";

export const useUser = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: verifyToken,
    enabled: !!token,
  });
  return { data, isLoading };
};
