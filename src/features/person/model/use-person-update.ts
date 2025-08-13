/* eslint-disable @typescript-eslint/ban-ts-comment */
import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { PersonChange } from "./use-person-create";

export const usePersonUpdate = () => {
  const personMutation = rqClient.useMutation(
    "put",
    "/api/v1/persons/update/{person_id}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/api/v1/persons/get_all"),
        );
      },
    },
  );

  const personUpdate = async (data: PersonChange) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("department_id", String(data.department_id));
    if (data.image) {
      formData.append("image", data.image);
    }
    try {
      await personMutation.mutateAsync({
        // @ts-ignore
        body: formData,
        params: { path: { person_id: data.person_id! } },
      });
      return true;
    } catch {
      return false;
    }
  };

  return {
    personUpdate,
    isPending: personMutation.isPending,
  };
};
