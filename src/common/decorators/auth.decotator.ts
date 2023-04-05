import { AccessTokenGuard } from '@guards/access-token.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(AccessTokenGuard));
}
