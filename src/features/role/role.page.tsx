import { PageLayout } from "@/shared/ui";
import { RoleForm } from "./ui/role-form";
import { useRoleList } from "./model/use-role-list";
import { RoleTable } from "./ui/role-table";

const RolePage = () => {
  const { roles, isLoading } = useRoleList();
  return (
    <PageLayout
      title="Роли"
      addButton={<RoleForm />}
      children={<RoleTable data={roles} isLoading={isLoading} />}
    />
  );
};

export const Component = RolePage;
