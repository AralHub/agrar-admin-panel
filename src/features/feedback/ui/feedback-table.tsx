import { ApiSchemas } from "@/shared/api/schema";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shared/ui/kit/table";
import { Star } from "lucide-react";
import { FC } from "react";
import { BranchDelete } from "./branch-delete";

type FeedBackProps = {
  data: ApiSchemas["BranchRead"][];
  isLoading: boolean;
};

const TableHeadCustom = ({ stars }: { stars: number }) => {
  return (
    <TableHead>
      <div className="flex">
        {Array.from({ length: stars }).map(() => (
          <Star width={18} height={18} />
        ))}
      </div>
    </TableHead>
  );
};

export const FeedBackTable: FC<FeedBackProps> = ({ data, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-[16px]">
          <TableHead>Болим</TableHead>
          <TableHeadCustom stars={1} />
          <TableHeadCustom stars={2} />
          <TableHeadCustom stars={3} />
          <TableHeadCustom stars={4} />
          <TableHeadCustom stars={5} />
          <TableHead>Рейтинг</TableHead>
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
          <TableRow key={item.id} className="text-lg">
            <TableCell className="font-medium py-5 text-[16px]">
              {item.name}
            </TableCell>
            <TableCell>{item.rating_1_count}</TableCell>
            <TableCell>{item.rating_2_count}</TableCell>
            <TableCell>{item.rating_3_count}</TableCell>
            <TableCell>{item.rating_4_count}</TableCell>
            <TableCell>{item.rating_5_count}</TableCell>
            <TableCell>{item.rating.toFixed(2)}</TableCell>
            <TableCell>
              <BranchDelete id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
