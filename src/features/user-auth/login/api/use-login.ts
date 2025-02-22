import { STORAGE_KEYS } from "@/configs";
import { supabase, useNotification } from "@/features/shared";
import { StorageUtil } from "@/lib";
import { useState } from "react";

interface LoginRequest {
  email: string;
  password: string;
}

interface UseLoginFunction {
  onLogin: (request: LoginRequest) => void;
  loading: boolean;
}

export const useLogin = (): UseLoginFunction => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();

  const onLogin = async (request: LoginRequest) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        ...request,
      });

      if (error) {
        onNotify("error", error.message);
        return;
      }

      StorageUtil.setItem(
        STORAGE_KEYS.CLIENT_TOKEN,
        data.session?.access_token
      );
      StorageUtil.setItem(STORAGE_KEYS.EXPIRES_IN, data.session?.expires_in);
      StorageUtil.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        data.session?.refresh_token
      );
      StorageUtil.setItem(STORAGE_KEYS.USER_DATA, data.user);
    } catch (error) {
      console.error(error);
      onNotify("error", "An unknown error occured.");
    } finally {
      setLoading(false);
    }
  };

  return {
    onLogin,
    loading,
  };
};
