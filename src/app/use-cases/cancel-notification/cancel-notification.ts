import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundException } from '../errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
