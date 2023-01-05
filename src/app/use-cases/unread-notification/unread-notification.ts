import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundException } from '../errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
