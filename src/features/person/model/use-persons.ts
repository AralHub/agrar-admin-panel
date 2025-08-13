import { useState } from "react";
import { usePersonList } from "./use-person-list";

export const usePersons = ({ department_id }: { department_id: number }) => {
  const [page, setPage] = useState(1);
  const page_size = 10;

  const { persons, paginationInfo,isLoading } = usePersonList({
    department_id,
    page,
    page_size,
  });
  const totalPages = paginationInfo?.total_pages ?? 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    persons,
    pages,
    handlePageChange,
    totalPages,
    page,
    isLoading
  };
};
