import { rqClient } from "@/shared/api/instance";
import { queryClient } from '@/shared/api/query-client'
import { ApiSchemas } from "@/shared/api/schema";

export const useRoleCreate = () => {
  const roleMutation = rqClient.useMutation("post", "/api/v1/roles", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/api/v1/roles/get_all")
      )
    }
  });

  const createRole = async (data: ApiSchemas["RoleCreate"]) => {
    try {
      await roleMutation.mutateAsync({ body: data });
      return true;
    } catch {
      return false;
    }
  };

  return {
    createRole,
    isPending: roleMutation.isPending,
  };
};
