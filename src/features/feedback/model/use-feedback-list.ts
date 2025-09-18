import { rqClient } from "@/shared/api/instance";

export const useFeedbackList = () => {
  const { data, isLoading } = rqClient.useQuery(
    "get",
    "/api/v1/feedbackget_all",
  );

  const feedBackList = data?.data ?? [];
  return { isLoading, feedBackList };
};
