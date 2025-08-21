/* eslint-disable @typescript-eslint/ban-ts-comment */
import { rqClient } from "@/shared/api/instance";
import { PersonChange } from "./use-person-create";

export const usePersonUpdate = () => {
  const personMutation = rqClient.useMutation(
    "put",
    "/api/v1/persons/update/{person_id}",
  );

  const personUpdate = async (data: PersonChange) => {
    try {
      await personMutation.mutateAsync({
        // @ts-ignore
        body: data,
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
