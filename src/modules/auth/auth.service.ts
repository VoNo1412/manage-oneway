import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { IUserEntity } from "../user/interface/user.interface";
import { AuthDto } from "./dto/auth.dto";
import { JwtHelper } from "./helper/auth.helper";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtHelper: JwtHelper
    ) { }

    async validatedUser(email: string, password: string): Promise<IUserEntity> {
        const user = await this.userService.findUser(email);

        if (!user || !user.verifyPassword(password, user.password)) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async signIn(login: AuthDto): Promise<any> {
        const user = await this.userService.findUser(login.email);
        const { id, username, email } = user;
        const token = await this.jwtHelper.signToken({ id, username, email });
        return {
            accessToken: token,
            user
        };
    }

    async signUp(signUp: AuthDto) {
        return await this.userService.createUser(signUp);
    }
}