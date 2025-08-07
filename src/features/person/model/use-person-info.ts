import { rqClient } from "@/shared/api/instance";

export const usePersonInfo = ({ person_id }: { person_id: number }) => {
  const { data, isLoading } = rqClient.useQuery(
    "get",
    "/api/v1/persons/get_by_id/{person_id}",
    {
      params: { path: { person_id } },
    },
  );
  const personInfo = data?.data;
  return {
    personInfo,
    isLoading,
  };
};
