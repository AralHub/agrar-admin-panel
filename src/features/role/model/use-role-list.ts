import { rqClient } from "@/shared/api/instance";

export const useRoleList = () => {
  const { data, isLoading } = rqClient.useQuery("get", "/api/v1/roles/get_all");
  const roles = data?.data ?? [];
  return {
    roles,
    isLoading,
  };
};
