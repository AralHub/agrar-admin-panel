import { rqClient } from "@/shared/api/instance";
import { PaginationParams } from "@/shared/model/types";

export const usePersonList = (
  params: PaginationParams & { department_id: number | null },
) => {
  const { data, isLoading } = rqClient.useQuery(
    "get",
    "/api/v1/persons/get_all",
    {
      params: { query: params },
    },
    {
      enabled: params.department_id !== null,
    },
  );

  const persons = data?.data ?? [];
  const paginationInfo = data?.pagination;

  return {
    persons,
    isLoading,
    paginationInfo,
  };
};
