import { useRoleList } from "@/features/role";
import { useState, useEffect } from "react";
import { useDepartmentList } from "./use-department-list";

export const useDepartment = () => {
  const [page, setPage] = useState(1);
  const page_size = 10;
  const { roles } = useRoleList();
  const [role_id, setRoleId] = useState<number | undefined>(undefined);
  const { departments, paginationInfo, isLoading } = useDepartmentList({
    role_id,
    page,
    page_size,
  });
  const totalPages = paginationInfo?.total_pages ?? 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (roles.length > 0) {
      setRoleId(roles[0].id);
    }
  }, [roles]);

  const onChangeFilter = (value: string) => setRoleId(Number(value));
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    departments,
    pages,
    onChangeFilter,
    handlePageChange,
    totalPages,
    page,
    role_id,
    roles,
    isLoading
  };
};
