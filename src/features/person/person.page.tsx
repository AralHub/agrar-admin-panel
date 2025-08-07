import { PathParams, ROUTES } from "@/shared/model/routes";
import { PageLayout } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { usePersons } from "./model/use-persons";
import { CustomPagination } from "../pagination";
import { PersonTable } from "./ui/person-table";
import { PersonForm } from "./ui/person-form";

const PersonPage = () => {
  const { departmentId } = useParams<PathParams[typeof ROUTES.PERSONS]>();
  const { handlePageChange, page, pages, persons, totalPages } = usePersons({
    department_id: Number(departmentId),
  });

  return (
    <PageLayout
      title="Персонал"
      addButton={<PersonForm />}
      children={
        <>
          <PersonTable
            data={persons}
          />
          <CustomPagination
            handleChange={handlePageChange}
            page={page}
            pages={pages}
            totalPages={totalPages}
          />
        </>
      }
    />
  );
};

export const Component = PersonPage;
