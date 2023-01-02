import { Injectable } from '@nestjs/common';
import { PrimaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';
import { Notification } from 'src/app/entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notification-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(notification: Notification): Promise<void> {
    const raw = PrimaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
