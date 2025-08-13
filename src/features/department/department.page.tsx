import { PageLayout } from "@/shared/ui";
import { DepartmentForm } from "./ui/department-form";
import { DepartmentFilter } from "./ui/department-filter";
import { DepartmentTable } from "./ui/department-table";
import { useDepartment } from "./model/use-department";
import { CustomPagination } from "../pagination";
import { Button } from "@/shared/ui/kit/button";
import { ArrowDownToLine } from "lucide-react";
import { usePersonDownload } from "../person";

const Department = () => {
  const {
    departments,
    handlePageChange,
    onChangeFilter,
    page,
    pages,
    role_id,
    totalPages,
    roles,
    isLoading: dataLoading
  } = useDepartment();

  const { link, isReady, showNotification, triggerDownload, isLoading } =
    usePersonDownload();

  return (
    <PageLayout
      title="Департмент"
      addButton={
        <div className="flex gap-5">
          <DepartmentForm />
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                if (isReady) {
                  window.location.href = link;
                } else {
                  triggerDownload();
                }
              }}
              disabled={isLoading || (showNotification && !isReady)}
            >
              <ArrowDownToLine className="mr-2" />
              {isReady
                ? "Скачать персонал"
                : isLoading
                  ? "Подготовка файла..."
                  : "Подготовить скачивание"}
            </Button>

            {showNotification && !isReady && (
              <div className="text-sm text-muted-foreground">
                Файл будет доступен для скачивания через 5 минут...
              </div>
            )}
          </div>
        </div>
      }
      filter={
        <DepartmentFilter
          roleId={role_id}
          data={roles}
          onChange={onChangeFilter}
        />
      }
      children={
        <>
          <DepartmentTable data={departments} isLoading={dataLoading}/>
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

export const Component = Department;
