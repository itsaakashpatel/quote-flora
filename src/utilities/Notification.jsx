import { useEffect } from "react";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { quotes } from "../data";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Notification = () => {
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const inspiringQuote = quotes[randomIndex];

    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got motivation!",
          body: `${inspiringQuote.content} - ${inspiringQuote.author}`,
          // icon:
        },
        trigger: { seconds: 2 },
      });
    }

    schedulePushNotification();
  }, []);

  return null;
};

export default Notification;
