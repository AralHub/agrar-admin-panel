import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

export const useDeletePerson = () => {
  const personMutation = rqClient.useMutation(
    "delete",
    "/api/v1/persons/delete/{person_id}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/api/v1/persons/get_all"),
        );
      },
    },
  );

  const deletePerson = async (person_id: number) => {
    try {
      await personMutation.mutateAsync({ params: { path: { person_id } } });
      return true;
    } catch {
      return false;
    }
  };
  return {
    deletePerson,
    isPending: personMutation.isPending,
  };
};
