import { RouteObject } from "react-router-dom";
import { Dashboard } from "../../dashboard";
import ProtectedLayout from "../layout/protected-layout";

export const taskMgtRoutes: RouteObject[] = [
  {
    Component: ProtectedLayout,
    children: [
        {
            path: '/dashboard',
            Component: Dashboard
        }
    ],
  },
];
