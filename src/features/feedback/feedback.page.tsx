import { PageLayout } from "@/shared/ui";
import { FeedBackTable } from "./ui/feedback-table";
import { BranchForm } from "./ui/branch-form";
import { useFeedbackList } from "./model/use-feedback-list";

const FeedBack = () => {
  const { feedBackList, isLoading } = useFeedbackList();
  return (
    <PageLayout
      title="Болим"
      addButton={<BranchForm />}
      children={<FeedBackTable data={feedBackList} isLoading={isLoading} />}
    />
  );
};

export const Component = FeedBack;
