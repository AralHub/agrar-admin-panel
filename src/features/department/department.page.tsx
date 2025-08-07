import { PageLayout } from "@/shared/ui";
import { DepartmentForm } from "./ui/department-form";
import { DepartmentFilter } from "./ui/department-filter";
import { DepartmentTable } from "./ui/department-table";
import { useDepartment } from "./model/use-department";
import { CustomPagination } from '../pagination'

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
