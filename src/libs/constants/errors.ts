import { HttpStatus } from '@nestjs/common';

export const Errors = {
  USER_NOT_FOUND: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'USER_NOT_FOUND',
    message: '인증된 사용자가 아닙니다.',
  },
  PROJECT_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    code: 'PROJECT_NOT_FOUND',
    message: '프로젝트를 찾을 수 없습니다.',
  },
} as const;
