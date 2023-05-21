import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IPayloadAuth } from "../interface/auth.interface";
import { Request } from "express";
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { jwtSecret } from "../constants/secretjwt.constant";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtHelper {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async signToken(payload: IPayloadAuth): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<IUserEntity> {
        const data: any = this.jwtService.verifyAsync(token, { secret: jwtSecret.secret });
        const user = await this.userService.findUser(data.email);
        return user;
    }

    async getTokenFromHeader(req: Request): Promise<string> {
        const [type, token] = req.headers?.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}