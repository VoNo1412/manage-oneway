import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { UserService } from "src/modules/user/user.service";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtHelper {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) { }

    async signToken(payload: any, expires?: string): Promise<string> {
        return this.jwtService.sign(payload, { secret: this.configService.get('SECRET') })
    }

    async verifyToken(token: string): Promise<IUserEntity> {
        const data = await this.jwtService.verify(token, { secret: this.configService.get("SECRET") })
        return this.userService.findUser(data.id);
    }

    extractTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
} 