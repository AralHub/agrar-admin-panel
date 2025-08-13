import { ApiSchemas } from "@/shared/api/schema";
import { CONFIG } from "@/shared/model/config";
import { Skeleton } from '@/shared/ui/kit/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { FC } from "react";

type SearchTable = {
  data: ApiSchemas["PersonFullRead"][];
  isFetching: boolean;
};

export const SearchTable: FC<SearchTable> = ({ isFetching, data }) => {
  const isEmpty = !isFetching && (!data || data.length === 0);

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Фото</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Департмент</TableHead>
          <TableHead>Роль</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching &&
          Array.from({ length: 5 }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-[100px] w-[100px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
            </TableRow>
          ))}

        {isEmpty && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
              Ничего не найдено
            </TableCell>
          </TableRow>
        )}

        {!isFetching &&
          data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={CONFIG.API_BASE_URL + "/" + item.image_url}
                  width={100}
                  height={100}
                  className="rounded"
                />
              </TableCell>
              <TableCell className="font-medium text-[16px]">
                {item.first_name + " " + item.last_name}
              </TableCell>
              <TableCell>{item.department.name}</TableCell>
              <TableCell>{item.role.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
