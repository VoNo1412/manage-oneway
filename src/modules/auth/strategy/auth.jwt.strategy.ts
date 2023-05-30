import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { IAuth } from "../interface/auth.interface";
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        })
    }

    validate(payload: IAuth): Promise<IUserEntity> {
        return this.authService.validateUser({ email: payload.email, password: payload.password });
    }
}