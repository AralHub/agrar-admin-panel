import { PageLayout } from "@/shared/ui";
import { RoleForm } from "./ui/role-form";
import { useRoleList } from "./model/use-role-list";
import { RoleTable } from "./ui/role-table";

const RolePage = () => {
  const { roles } = useRoleList();
  return (
    <PageLayout
      title="Роли"
      addButton={<RoleForm />}
      children={<RoleTable data={roles} />}
    />
  );
};

export const Component = RolePage;
