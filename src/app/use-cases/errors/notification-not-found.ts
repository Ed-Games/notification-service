export class NotificationNotFoundException extends Error {
  constructor() {
    super('Notification not found');
  }
}
