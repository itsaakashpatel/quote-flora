import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { quotes } from '../data';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Notification = ({ notificationTime, notificationFrequency, isNotificationEnabled }) => {
  useEffect(() => {
    if (isNotificationEnabled) {
      let nextScheduledTime;
      const now = new Date();
      
      switch (notificationFrequency) {
        case 'daily':
          nextScheduledTime = new Date();
          nextScheduledTime.setHours(notificationTime.getHours());
          nextScheduledTime.setMinutes(notificationTime.getMinutes());
          nextScheduledTime.setSeconds(0);
          if (nextScheduledTime <= now) {
            nextScheduledTime.setDate(nextScheduledTime.getDate() + 1);
          }
          break;
        case 'weekly':
          nextScheduledTime = new Date(now);
          nextScheduledTime.setHours(notificationTime.getHours());
          nextScheduledTime.setMinutes(notificationTime.getMinutes());
          nextScheduledTime.setSeconds(0);

          while (nextScheduledTime.getDay() !== 0) {
            nextScheduledTime.setDate(nextScheduledTime.getDate() + 1);
          }

          if (nextScheduledTime <= now) {
            nextScheduledTime.setDate(nextScheduledTime.getDate() + 7);
          }
          break;
        case 'monthly':
          nextScheduledTime = new Date(now);
          nextScheduledTime.setDate(1);
          nextScheduledTime.setHours(notificationTime.getHours());
          nextScheduledTime.setMinutes(notificationTime.getMinutes());
          nextScheduledTime.setSeconds(0);

          if (nextScheduledTime <= now) {
            nextScheduledTime.setMonth(nextScheduledTime.getMonth() + 1);
          }
          break;
        default:
          break;
      }

      const delay = nextScheduledTime.getTime() - now.getTime();

      if (nextScheduledTime) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const inspiringQuote = quotes[randomIndex];

        const schedulePushNotification = async () => {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "You've got motivation!",
              body: `${inspiringQuote.content} - ${inspiringQuote.author}`,
            },
            trigger: { seconds: delay / 1000 },
          });
        };

        schedulePushNotification();
      }
    }
  }, [notificationTime, notificationFrequency, isNotificationEnabled]);

  return null;
};

export default Notification;
