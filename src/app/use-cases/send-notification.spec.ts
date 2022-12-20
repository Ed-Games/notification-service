import { SendNotification } from './send-notification';

describe('Send-Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: 'some content',
      category: ' some category',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
