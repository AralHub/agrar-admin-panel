import { PageLayout } from "@/shared/ui";
import { DepartmentForm } from "./ui/department-form";
import { DepartmentFilter } from "./ui/department-filter";
import { DepartmentPagination } from "./ui/department-pagination";
import { DepartmentTable } from "./ui/department-table";
import { useDepartment } from "./model/use-department";

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
  } = useDepartment();

  return (
    <PageLayout
      title="Департмент"
      addButton={<DepartmentForm />}
      searchInput={undefined}
      filter={
        <DepartmentFilter
          roleId={role_id}
          data={roles}
          onChange={onChangeFilter}
        />
      }
      children={
        <>
          <DepartmentTable data={departments} />
          <DepartmentPagination
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
