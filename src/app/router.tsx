import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { AppHeader } from "@/features/header";
import { Layout } from "@/shared/ui";
import { Sidebar } from "@/features/sidebar";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <>
                <AppHeader />
                <Layout sidebar={<Sidebar />} children={<Outlet />} />
              </>
            ),
            children: [
              {
                path: ROUTES.ROLE,
                lazy: () => import("@/features/role/role.page"),
              },
              {
                path: ROUTES.DEPARTMENT,
                lazy: () => import("@/features/department/department.page"),
              },
              {
                path: ROUTES.PERSONS,
                lazy: () => import("@/features/person/person.page"),
              },
              {
                path: ROUTES.PERSON,
                lazy: () => import("@/features/person/person-info.page"),
              },
              {
                path: ROUTES.PERSONS_SEARCH,
                lazy: () => import("@/features/search/search.page"),
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
    ],
  },
]);
