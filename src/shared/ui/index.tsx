import { ReactNode } from "react";
export function Layout({
  filters,
  children,
  sidebar,
  templates,
}: {
  filters?: React.ReactNode;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  templates?: React.ReactNode;
}) {
  return (
    <div className="pt-16 lg:pl-64 h-screen overflow-hidden">
      {sidebar}
      <div className="h-full overflow-y-auto pr-4 pl-4">
        <div className="flex flex-col gap-6 pb-10">
          {templates && (
            <div className="rounded-md bg-gray-100 p-4">{templates}</div>
          )}
          {filters}
          {children}
        </div>
      </div>
    </div>
  );
}

export const PageLayout = ({
  addButton,
  searchInput,
  title,
  children,
  filter,
}: {
  title: string;
  addButton?: ReactNode;
  searchInput?: ReactNode;
  children: ReactNode;
  filter?: ReactNode;
}) => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <header className="text-3xl font-medium">{title}</header>
      <div className="flex flex-row justify-between items-center">
        <div>{addButton}</div>
        <div className="flex flex-row items-center w-[300px] relative">
          {searchInput}
        </div>
      </div>
      <div>{filter}</div>
      {children}
    </div>
  );
};
