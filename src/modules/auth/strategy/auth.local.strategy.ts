import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<IUserEntity> {
        return this.authService.validateUser({ email, password })
    }
}