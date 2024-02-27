import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secrete',
    });
  }

  async validate(payload) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      college: payload.college,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };
  }
}
