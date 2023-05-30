import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { UserService } from "src/modules/user/user.service";
import { Request } from "express";

@Injectable()
export class JwtHelper {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async sign(payload: any): Promise<string> {
        return this.jwtService.sign(payload, { secret: process.env.SECRET })
    }

    async verifyToken(token: string): Promise<IUserEntity> {
        const data = await this.jwtService.verify(token, { secret: process.env.SECRET })
        return await this.userService.findUser(data.id);
    }

    extractTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
} 