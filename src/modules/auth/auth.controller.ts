import { Controller } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Body, Post, Req, UseGuards, Request, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./guard/auth.local.guard";
import { IResponseDto } from "src/common/response/response.dto";
import { IUserEntity } from "../user/interface/user.interface";
import { UserDecorator } from "src/common/decorators/user.decorators";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({type: AuthDto})
    async login(
        @UserDecorator() user: IUserEntity
    ) {
        return user;
    }

    @Post('signUp')
    async signUp(
        @Body() signUpDto: AuthDto
    ): Promise<any> {
        return await this.authService.signUp(signUpDto);
    }
}