import { useGetUserQuery } from "@/slices/usersApiSlice";

export const useFetchUser = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  return { user, error, isLoading };
};
