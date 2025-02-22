import { userAuthRoutes } from "@/features/user-auth/shared";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([...userAuthRoutes])

export const AppRouterProvider = () => (
    <RouterProvider router={router} />
)