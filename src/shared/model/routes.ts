import "react-router-dom";

export const ROUTES = {
  ROLE: "/",
  LOGIN: "/login",
  DEPARTMENT: "/department"
  // BOARD: "/boards/:boardId",
} as const;

// export type PathParams = {
//   [ROUTES.BOARD]: {
//     boardId: string;
//   };
// };

// declare module "react-router-dom" {
//   interface Register {
//     params: PathParams;
//   }
// }
