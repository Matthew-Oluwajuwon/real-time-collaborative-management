import { STORAGE_KEYS } from "@/configs";
import { StorageUtil } from "@/lib";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = StorageUtil.getItem<string>(STORAGE_KEYS.CLIENT_TOKEN);
    if (!token) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated;
};
