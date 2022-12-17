export class Content {
  private readonly content: string;

  constructor(content) {
    const iscontentLengthValid = this.validateContentLenght(content);
    if (!iscontentLengthValid) {
      throw new Error('Content length must be between 5 and 255 characteres');
    }

    this.content = content;
  }

  get value() {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }
}
