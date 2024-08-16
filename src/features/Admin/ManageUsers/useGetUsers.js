import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiAdmin";

export const useGetUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => getUsers({ username: localStorage.getItem("username") }),
  });

  return { users, isLoading, isError };
};
