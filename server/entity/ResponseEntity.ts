export class ResponseEntity<T> {
  private success: boolean;
  private message: string;
  private data: T[];

  constructor(success: boolean, message: string, data: T[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  toJSON(): any {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }

  getSuccess(): boolean {
    return this.success;
  }

  setSuccess(success: boolean): ResponseEntity<T> {
    this.success = success;
    return this;
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string): ResponseEntity<T> {
    this.message = message;
    return this;
  }

  getData(): T[] {
    return this.data;
  }

  setData(data: T[]): ResponseEntity<T> {
    this.data = data;
    return this;
  }
}
