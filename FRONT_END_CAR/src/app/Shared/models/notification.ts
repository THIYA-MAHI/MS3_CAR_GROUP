// notification.model.ts
export interface Notification {
  notificationId: string;
  title: string;
  message: string;
  notificationType: string;
  relatedEntityId: string;
  notificationPriority: string;
  isRead: boolean;
}
