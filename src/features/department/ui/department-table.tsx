import { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { Eye } from "lucide-react";
import { FC } from "react";
import { href, Link } from "react-router-dom";

type DepartmentTable = {
  data: ApiSchemas["DepartmentRead"][];
};

export const DepartmentTable: FC<DepartmentTable> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Название</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium py-5 text-[16px]">
              {item.name}
            </TableCell>
            <TableCell className="font-medium text-[16px]">
              <Link
                to={href(ROUTES.PERSONS, {
                  departmentId: String(item.id),
                })}
              >
                <Button variant={"default"} className="ml-5">
                  <Eye /> посмотреть
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
