import { CancelNotification } from '@app/use-cases/cancel-notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-notifications/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipients-notifications/get-recipients-notifications';
import { ReadNotification } from '@app/use-cases/read-notification/read-notification';
import { SendNotification } from '@app/use-cases/send-notification/send-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification/unread-notification';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
