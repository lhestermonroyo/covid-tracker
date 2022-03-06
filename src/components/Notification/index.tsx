import React, { useEffect } from 'react';
import { notification } from 'antd';

const Notification: React.FC<NotificationInterface> = (props) => {
  const { type, message, description } = props;

  useEffect(() => {
    notification[type]({
      message,
      description,
    });
  }, []);

  return null;
};

export default Notification;
