import { ApiSchemas } from "@/shared/api/schema";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { FC } from "react";

type RoleTable = {
  data: ApiSchemas["RoleRead"][];
  isLoading: boolean;
};

export const RoleTable: FC<RoleTable> = ({ data, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Название</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 2 }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
            </TableRow>
          ))}
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium py-5 text-[16px]">
              {item.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
