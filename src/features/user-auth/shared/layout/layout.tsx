import { Reports } from "iconoir-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100svh] bg-[url('@/assets/images/auth-bg-img.svg')] bg-no-repeat bg-cover">
      <Reports height={150} width={150} className="mb-10" strokeWidth={0.2} color="#FFFFFF" />
      <Outlet />
    </div>
  );
};
