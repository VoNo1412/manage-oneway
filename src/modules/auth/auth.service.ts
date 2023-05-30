import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { IUserEntity } from "../user/interface/user.interface";
import { AuthDto } from "./dto/auth.dto";
import { IAuth, IAuthTokenUser } from "./interface/auth.interface";
import { JwtHelper } from "./helper/auth.helper";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtHelper: JwtHelper
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
        const token = await this.jwtHelper.sign(payload);

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

}