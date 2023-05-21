import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { IResponseDto } from "src/common/response/response.dto";
import { IUserEntity } from "src/modules/user/interface/user.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<IResponseDto<IUserEntity>> {
        return await this.authService.validatedUser(email, password);
    }
}