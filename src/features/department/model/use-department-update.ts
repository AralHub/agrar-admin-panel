import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { ApiSchemas } from "@/shared/api/schema";

export const useDepartmentUpdate = () => {
  const mutationUpdate = rqClient.useMutation(
    "put",
    "/api/v1/departments/update/{department_id}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/api/v1/departments/get_all"),
        );
      },
    },
  );

  const departmentUpdate = async (
    data: ApiSchemas["DepartmentFilter"] & { department_id: number },
  ) => {
    try {
      await mutationUpdate.mutateAsync({
        body: data,
        params: { path: { department_id: data.department_id } },
      });
      return true;
    } catch {
      return false;
    }
  };

  return { departmentUpdate, isPending: mutationUpdate.isPending };
};
