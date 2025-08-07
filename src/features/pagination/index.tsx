import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/kit/pagination";
import { FC } from "react";

type CustomPagination = {
  page: number;
  handleChange: (newPage: number) => void;
  pages: number[];
  totalPages: number;
};

export const CustomPagination: FC<CustomPagination> = ({
  handleChange,
  page,
  pages,
  totalPages,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleChange(page - 1);
            }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {pages.map((pg) => (
          <PaginationItem key={pg}>
            <PaginationLink
              href="#"
              isActive={pg === page}
              onClick={(e) => {
                e.preventDefault();
                handleChange(pg);
              }}
            >
              {pg}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleChange(page + 1);
            }}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
