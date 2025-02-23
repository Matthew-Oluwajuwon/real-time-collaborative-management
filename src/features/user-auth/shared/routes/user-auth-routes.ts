import { RouteObject } from "react-router-dom";
import { Login } from "../../login";
import { Layout } from "../layout";

export const userAuthRoutes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Login,
      }
    ],
  },
];
