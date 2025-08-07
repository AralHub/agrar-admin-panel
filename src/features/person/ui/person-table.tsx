import { ApiSchemas } from "@/shared/api/schema";
import { CONFIG } from "@/shared/model/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { FC } from "react";
import { PersonDelete } from "./person-delete";
import { Button } from "@/shared/ui/kit/button";
import { Eye } from "lucide-react";
import { href, Link, PathParam, useParams } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

type PersonTable = {
  data: ApiSchemas["PersonRead"][];
};

export const PersonTable: FC<PersonTable> = ({ data }) => {
  const { departmentId } = useParams<PathParam<typeof ROUTES.PERSON>>();
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Фото</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <img
                src={CONFIG.API_BASE_URL + "/" + item.image_url}
                width={100}
                height={100}
              />
            </TableCell>
            <TableCell className="font-medium text-[16px]">
              {item.first_name + " " + item.last_name}
            </TableCell>
            <TableCell className="font-medium text-[16px]">
              <PersonDelete person_id={item.id} />
              <Link
                to={href(ROUTES.PERSON, {
                  departmentId: String(departmentId),
                  personId: String(item.id),
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
