import { STORAGE_KEYS } from "@/configs";
import { StorageUtil } from "@/lib";
import { ComponentProps, ComponentType } from "react";
import { useNavigate } from "react-router-dom";

export const withAuth = (Component: ComponentType) => {
  return (props: ComponentProps<typeof Component>) => {
    const navigate = useNavigate();
    const token = StorageUtil.getItem(STORAGE_KEYS.CLIENT_TOKEN);

    if (!token) {
      navigate("/");
      return null
    }

    return <Component {...props} />;
  };
};
