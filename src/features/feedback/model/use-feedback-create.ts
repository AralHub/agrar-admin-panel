import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { ApiSchemas } from "@/shared/api/schema";

export const useFeedbackCreate = () => {
  const branchMutation = rqClient.useMutation(
    "post",
    "/api/v1/feedbackadd_branch",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/api/v1/feedbackget_all"),
        );
      },
    },
  );

  const createBranch = async (data: ApiSchemas["BranchCreate"]) => {
    try {
      await branchMutation.mutateAsync({ body: data });
      return true;
    } catch {
      return false;
    }
  };
  return { createBranch, isPending: branchMutation.isPending };
};
