import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

export const useFeedbackDelete = () => {
  const fbMutation = rqClient.useMutation(
    "delete",
    "/api/v1/feedbackdelete_branch",
  );

  const fbDelete = async (branch_id: number) => {
    try {
      await fbMutation.mutateAsync(
        { params: { query: { branch_id } } },
        {
          onSettled: async () =>
            await queryClient.invalidateQueries(
              rqClient.queryOptions("get", "/api/v1/feedbackget_all"),
            ),
        },
      );
      return true;
    } catch {
      return false;
    }
  };

  return { fbDelete, isPending: fbMutation.isPending };
};
