import "react-router-dom";

export const ROUTES = {
  ROLE: "/",
  DEPARTMENT: "/department",
  PERSONS_SEARCH: "/persons/search",
  PERSONS: "/department/:departmentId",
  PERSON: "/department/:departmentId/:personId",
  LOGIN: "/login",
} as const;

export type PathParams = {
  [ROUTES.PERSONS]: {
    departmentId: string;
  };
  [ROUTES.PERSON]: {
    personId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
