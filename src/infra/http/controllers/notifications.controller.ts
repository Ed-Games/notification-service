import { Notification } from '@app/entities/notification';
import { CancelNotification } from '@app/use-cases/cancel-notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-notifications/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipients-notifications/get-recipients-notifications';
import { ReadNotification } from '@app/use-cases/read-notification/read-notification';
import { SendNotification } from '@app/use-cases/send-notification/send-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotification: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipientId(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipientId(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({ notificationId: id });
  }
}
