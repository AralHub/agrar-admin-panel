import { PageLayout } from "@/shared/ui";
import { usePersonInfo } from "./model/use-person-info";
import { PathParam, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { CONFIG } from "@/shared/model/config";
import { Button } from "@/shared/ui/kit/button";
import { ChevronLeft } from "lucide-react";
import { PersonUpdateForm } from "./ui/person-update-form";
import { Skeleton } from '@/shared/ui/kit/skeleton'

const PersonInfoPage = () => {
  const navigate = useNavigate();
  const { personId } = useParams<PathParam<typeof ROUTES.PERSON>>();
  const { personInfo, isLoading } = usePersonInfo({
    person_id: Number(personId)!,
  });

  return (
    <PageLayout
      title="Информация о персонале"
      addButton={
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Назад
        </Button>
      }
    >
      <div className="flex flex-row gap-10">
        {isLoading ? (
          <Skeleton className="h-[400px] w-[400px] rounded-lg" />
        ) : (
          <img
            src={CONFIG.API_BASE_URL + "/" + personInfo?.image_url}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        )}

        <div className="flex flex-col justify-center gap-5 text-2xl">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-[200px] w-[300px]" />
            </>
          ) : (
            <>
              <div>
                <span className="text-gray-700">Имя:</span>{" "}
                {personInfo?.first_name}
              </div>
              <div>
                <span className="text-gray-700">Фамилия:</span>{" "}
                {personInfo?.last_name}
              </div>
              <div>
                <span className="text-gray-700">Роль:</span>{" "}
                {personInfo?.role.name}
              </div>
              <div>
                <span className="text-gray-700">Департмент:</span>{" "}
                {personInfo?.department.name}
              </div>
              <PersonUpdateForm personInfo={personInfo} />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export const Component = PersonInfoPage;
