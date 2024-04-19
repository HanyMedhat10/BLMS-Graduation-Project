import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

export const CurrentUserSocket = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getClient<Socket>();
    const token = extractTokenFromHeader(request.request);
    if (token) {
      const decoded = verify(token, 'secrete');
      return decoded;
    }
    return new UnauthorizedException();
  },
);

function extractTokenFromHeader(request: any): string | undefined {
  const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
  return scheme === 'Bearer' ? token : undefined;
}
