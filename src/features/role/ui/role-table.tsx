import { ApiSchemas } from "@/shared/api/schema";
import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/kit/table";
import { FC } from "react";

type RoleTable = {
  data: ApiSchemas["RoleRead"][];
};

export const RoleTable: FC<RoleTable> = ({ data }) => {
  return (
    <Table>
      <TableBody>
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
