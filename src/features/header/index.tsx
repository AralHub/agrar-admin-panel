import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";

export function AppHeader() {
  const { isAuth, logout } = useSession();

  if (!isAuth) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm py-3 px-4 z-50 h-16">
      <div className="flex items-center justify-between h-full container mx-auto">
        <div className="text-xl font-semibold">Agrar funct</div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="hover:bg-destructive/10"
        >
          Выйти
        </Button>
      </div>
    </header>
  );
}
