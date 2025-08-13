import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link, useLocation } from "react-router-dom";
import { UserCog, UserPen, UserSearch } from "lucide-react";
import { cn } from "@/shared/lib/css";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={cn(
        "fixed top-22 left-0 w-20 lg:w-64 h-[calc(100vh-64px)] border-r p-4 space-y-4 overflow-y-auto bg-white z-40",
        className,
      )}
    >
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 px-2">Навигация</div>

        <Button
          variant={currentPath === ROUTES.ROLE ? "secondary" : "ghost"}
          className="w-full lg:justify-start"
          asChild
        >
          <Link
            to={ROUTES.ROLE}
            className="flex justify-center lg:justify-start"
          >
            <UserCog className="h-10 w-10 lg:mr-2" />
            <span>Роль</span>
          </Link>
        </Button>
        <Button
          variant={currentPath === ROUTES.DEPARTMENT ? "secondary" : "ghost"}
          className="w-full lg:justify-start"
          asChild
        >
          <Link
            to={ROUTES.DEPARTMENT}
            className="flex justify-center lg:justify-start"
          >
            <UserPen className="h-10 w-10 lg:mr-2" />
            <span>Департмент</span>
          </Link>
        </Button>
        <Button
          variant={currentPath === ROUTES.PERSONS_SEARCH ? "secondary" : "ghost"}
          className="w-full lg:justify-start"
          asChild
        >
          <Link
            to={ROUTES.PERSONS_SEARCH}
            className="flex justify-center lg:justify-start"
          >
            <UserSearch className="h-10 w-10 lg:mr-2" />
            <span>Поиск</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
