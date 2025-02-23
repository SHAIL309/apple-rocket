import React from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api[type]({
      message: message,
      description: description,
    });
  };

  React.useEffect(() => {
    openNotification();
  }, [type, message, description]);

  return <>{contextHolder}</>;
};

export default Notification;
