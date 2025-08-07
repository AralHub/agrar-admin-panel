import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet, redirect } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuth } = useSession();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  const token = await useSession.getState().refreshTokenHandle();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
