import { taskMgtRoutes } from "@/features/task-mgt";
import { userAuthRoutes } from "@/features/user-auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([...userAuthRoutes, ...taskMgtRoutes])

export const AppRouterProvider = () => (
    <RouterProvider router={router} />
)