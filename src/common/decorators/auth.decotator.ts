import { AccessTokenGuard } from "@guards/access-token.guard";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

export function Auth() {
  return applyDecorators(
    UseGuards(AccessTokenGuard)
  )
}