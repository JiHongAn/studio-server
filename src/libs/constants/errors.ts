import { HttpStatus } from '@nestjs/common';

export const Errors = {
  USER_NOT_FOUND: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'USER_NOT_FOUND',
    message: '인증된 사용자가 아닙니다.',
  },
} as const;
