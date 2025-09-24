import { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { Users } from "lucide-react";
import { FC } from "react";
import { href, Link } from "react-router-dom";
import { DepartmentUpdateForm } from "./department-update-form";

type Datas = ApiSchemas["DepartmentRead"] & { count: number };

type DepartmentTable = {
  data: Datas[];
  isLoading: boolean;
};

export const DepartmentTable: FC<DepartmentTable> = ({ data, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Название</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <TableRow key={idx} className="flex flex-row justify-between pr-5">
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
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
            <TableCell className="font-medium text-[16px] flex flex-row justify-between">
              <Link
                to={href(ROUTES.PERSONS, {
                  departmentId: String(item.id),
                })}
              >
                <Button variant={"default"}>
                  <Users />
                  {item.count} <span>посмотреть</span>
                </Button>
              </Link>
              <DepartmentUpdateForm departmentInfo={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
