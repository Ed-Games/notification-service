import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You received a friendship request');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('Hi')).toThrow();
  });

  it('should not be able to create a notification content with more then 255 characters', () => {
    expect(() => new Content('H'.repeat(256))).toThrow();
  });
});
