import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import { IUserEntity } from "../user/interface/user.interface";
import { IResponseDto } from "src/common/response/response.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}
    
    async validatedUser(email: string, password: string): Promise<IResponseDto<IUserEntity>> {
        const user = await this.userService.findUser(email);
      
        if (!user || !user.verifyPassword(password, user.password)) {
          throw new UnauthorizedException();
        }
      
        return user;
    }

    async signUp(signUp: AuthDto) {
        return await this.userService.createUser(signUp);
    }
}