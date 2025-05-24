import { HttpStatus } from '@nestjs/common';

export const Errors = {
  INVALID_INPUT: {
    status: HttpStatus.BAD_REQUEST,
    code: 'INVALID_INPUT',
    message: '입력 값을 확인해주세요.',
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'NOT_FOUND',
    message: '요청하신 리소스를 찾을 수 없습니다.',
  },
  USER_NOT_FOUND: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'USER_NOT_FOUND',
    message: '사용자를 찾을 수 없습니다.',
  },
  PROJECT_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    code: 'PROJECT_NOT_FOUND',
    message: '프로젝트를 찾을 수 없습니다.',
  },
  EMAIL_ALREADY_EXIST: {
    status: HttpStatus.BAD_REQUEST,
    code: 'EMAIL_ALREADY_EXIST',
    message: '이미 등록된 이메일입니다.',
  },
  INVALID_CREDENTIALS: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'INVALID_CREDENTIALS',
    message: '이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  INVALID_REFRESH_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'INVALID_REFRESH_TOKEN',
    message: '유효하지 않은 리프레시 토큰입니다.',
  },
} as const;
