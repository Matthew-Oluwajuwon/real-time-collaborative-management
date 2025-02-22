import { App } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

interface UseNotificationFunction {
  onNotify: (type: NotificationType, message: string) => void;
}

export const useNotification = (): UseNotificationFunction => {
  const { notification } = App.useApp();

  const onNotify = (type: NotificationType, message: string) => {
    notification.open({
      message,
      type,
      showProgress: true,
      placement: "bottomLeft",
    });
  };

  return {
    onNotify,
  };
};
