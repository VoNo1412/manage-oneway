import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from "../constants/secretjwt.constant";
import { IPayload } from "../interface/payload.validate";
import { AuthService } from "../auth.service";
import { IUserEntity } from "src/modules/user/interface/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            secretOrKey: jwtSecret.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: IPayload): Promise<IUserEntity> {
        return await this.authService.validatedUser(payload.email, payload.password);
    }
}
