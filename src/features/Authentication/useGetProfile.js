import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiUsers";

export const useGetProfile = () => {
  const username = localStorage.getItem("username");
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    enabled: !!username,
  });

  return { profile, isLoading };
};
