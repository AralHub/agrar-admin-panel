import { rqClient } from "@/shared/api/instance";

export const usePersonalSearch = ({ search }: { search: string }) => {
  const { data, refetch, isFetching } = rqClient.useQuery(
    "get",
    "/api/v1/persons/search/{search}",
    {
      params: { path: { search } },
    },
    { enabled: false },
  );

  const personals = data?.data ?? []
  return {
    personals,
    refetch,
    isFetching,
  };
};
