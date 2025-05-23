import { HttpException } from '@nestjs/common';
import { Errors } from '../constants/errors';

export class AppException extends HttpException {
  constructor(codeKey: keyof typeof Errors, overrideMessage?: string) {
    const { status, code, message } = Errors[codeKey];
    super({ code, message: overrideMessage ?? message }, status);
  }
}
