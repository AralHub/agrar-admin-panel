import { ApiSchemas } from "@/shared/api/schema";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { FC } from "react";

type DepartmentProps = {
  roleId: number | undefined;
  data: ApiSchemas["RoleRead"][];
  onChange: (value: string) => void;
};

export const DepartmentFilter: FC<DepartmentProps> = ({
  data,
  onChange,
  roleId,
}) => {
  return (
    <ToggleGroup
      type="single"
      onValueChange={onChange}
      value={String(roleId)}
    >
      {data?.map((item) => (
        <ToggleGroupItem
          key={item.id}
          value={String(item.id)}
          variant={"outline"}
          className="px-5 cursor-pointer"
        >
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
