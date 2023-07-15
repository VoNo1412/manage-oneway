import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { IUserEntity } from "../user/interface/user.interface";
import { AuthDto } from "./dto/auth.dto";
import { JwtHelper } from "./helper/auth.helper";
import { IAuth, IAuthTokenUser } from "./interface/auth.interface";
import { User } from "../../common/decorators/user.decorators";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtHelper: JwtHelper,
        private readonly configService: ConfigService
    ) { }

    async signUp(authDto: AuthDto): Promise<IUserEntity> {
        return await this.userService.createUser(authDto)
    }

    async login(user: IUserEntity): Promise<IAuthTokenUser> {
        const payload = {
            id: user.id,
            email: user.email,
            password: user.password,
        }
        const token = await this.jwtHelper.signToken(payload);
        const refreshToken = await this.jwtHelper.signToken(payload, this.configService.get('REFRESH_TOKEN_EXPIRES_TIME'));
        await this.userService.updateUser({...user, refresh_token: refreshToken});

        return {
            access_token: token,
            user
        }
    }

    async validateUser(authLogin: IAuth): Promise<IUserEntity> {
        const user = await this.userService.findUser(authLogin.email);
        if (!user || !(await user.verifyPassword(authLogin.password, user.password))) 
            throw new HttpException('Please check email or password!', HttpStatus.NOT_FOUND);
        return user;
    }

    async _getCookieWithJwtToken(@User('userId') userId: number): Promise<string> {
        const payload = {sub: userId};
        const token = this.jwtHelper.signToken(payload);
        return `Authentication=${token}; HttpOnly; MAX-AGE=86400`;
    }
}