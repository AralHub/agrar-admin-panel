import { rqClient } from "@/shared/api/instance";
import { PaginationParams } from "@/shared/model/types";

export const useDepartmentList = (
  params: PaginationParams & { role_id: number | undefined },
) => {
  const { data, isLoading } = rqClient.useQuery(
    "get",
    "/api/v1/departments/get_all",
    {
      params: { query: params },
    },
    {
      enabled: params.role_id !== null,
    },
  );

  const departments = data?.data ?? [];
  const paginationInfo = data?.pagination;

  return {
    departments,
    isLoading,
    paginationInfo,
  };
};
