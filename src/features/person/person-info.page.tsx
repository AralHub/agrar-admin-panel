import { PageLayout } from "@/shared/ui";
import { usePersonInfo } from "./model/use-person-info";
import { PathParam, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { CONFIG } from "@/shared/model/config";
import { Button } from "@/shared/ui/kit/button";
import { ChevronLeft } from "lucide-react";

const PersonInfoPage = () => {
  const navigate = useNavigate();
  const { personId } = useParams<PathParam<typeof ROUTES.PERSON>>();
  const { personInfo } = usePersonInfo({ person_id: Number(personId)! });
  return (
    <PageLayout
      title="Информация о персонале"
      addButton={
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft />
          назад
        </Button>
      }
      children={
        <div className="flex flex-row gap-10">
          <img
            src={CONFIG.API_BASE_URL + "/" + personInfo?.image_url}
            width={400}
            height={400}
          />
          <div className="flex flex-col justify-center gap-5 text-2xl">
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
              <span className="text-gray-700">Департмент: </span>
              {personInfo?.department.name}
            </div>
          </div>
        </div>
      }
    />
  );
};

export const Component = PersonInfoPage;
