import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "../../config/jwt";
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException("Email not found");
    const isValidPassword = compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException("Email or password is invalid");
  
    const payload = { sub: user.email, name: user.name, role: user.isAdmin ? 'admin' : 'userDefault' };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "1d", secret: process.env.JWT_SECRET });
    const accessToken = this.jwtService.sign(payload, { expiresIn: "1h", secret: process.env.JWT_SECRET });
    this.cache.set(accessToken, { ...payload, refreshToken }, 84600000);

    // refresh token is saved in cache
    return {
      accessToken
    }
  }
}