import { createNotification, AppNotification } from "./firestore";

// Send an in-app notification to a user
export const sendInAppNotification = async (userId: string, title: string, message: string) => {
  const notification: AppNotification = {
    userId,
    title,
    message,
    read: false,
    createdAt: new Date().toISOString()
  };
  await createNotification(notification);
};

// Request notification permission and get token
export const requestPushNotificationToken = async (): Promise<string | null> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return null;
  }
  
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // In real production, get token via getMessaging from firebase/messaging.
    // For prototype preview sandbox, we simulate/retrieve a local browser token.
    return "mock-fcm-token-" + Math.random().toString(36).substr(2, 9);
  }
  return null;
};
