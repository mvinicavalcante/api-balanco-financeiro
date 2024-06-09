import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const token = request.headers['x-access-token'] as string;
    const dataInCache = await this.cache.get(token);

    if (!token) throw new UnauthorizedException('Access Token is required');
    if (!dataInCache)
      throw new UnauthorizedException('Access Token is Invalid');

    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const newAccessToken = await this.generateNewAccessToken(
          token,
          dataInCache,
        );
        request.headers['x-access-token'] = newAccessToken;
        response.setHeader('x-access-token', newAccessToken);
      }
    }

    return true;
  }

  // TODO: CRIAR TYPE|INTERFACE PARA PARAMETRO
  private async generateNewAccessToken(
    oldToken: string,
    dataInCache: any,
  ): Promise<string> {
    const { refreshToken, ...payload } = dataInCache;
    this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });

    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    await this.cache.set(newAccessToken, dataInCache, 84600000);
    await this.cache.del(oldToken);

    return newAccessToken;
  }
}
