import { STORAGE_KEYS } from "@/configs";
import { StorageUtil } from "@/lib";
import { ComponentProps, ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const withAuth = (Component: ComponentType) => {
  return (props: ComponentProps<typeof Component>) => {
    const navigate = useNavigate();
    const token = StorageUtil.getItem(STORAGE_KEYS.CLIENT_TOKEN);

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate]);

    if (token) {
      return <Component {...props} />;
    }

    return null;
  };
};
