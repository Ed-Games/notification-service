import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundException } from '../errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: ReadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
