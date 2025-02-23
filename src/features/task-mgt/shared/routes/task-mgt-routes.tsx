import { RouteObject } from "react-router-dom";
import ProtectedLayout from "../layout/protected-layout";

export const taskMgtRoutes: RouteObject[] = [
  {
    Component: ProtectedLayout,
    children: [
        {
            path: '/dashboard',
            element: <div>Dashboard</div>
        }
    ],
  },
];
