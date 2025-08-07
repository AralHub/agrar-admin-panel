/* eslint-disable @typescript-eslint/ban-ts-comment */
import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

type PersonCreate = {
  first_name: string;
  last_name: string;
  image?: File;
  department_id: number;
};

export const usePersonCreate = () => {
  const personMutation = rqClient.useMutation("post", "/api/v1/persons", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/api/v1/persons/get_all"),
      );
    },
  });

  const createPerson = async (data: PersonCreate) => {
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
      });
      return true;
    } catch {
      return false;
    }
  };

  return {
    createPerson,
    isPending: personMutation.isPending,
  };
};
