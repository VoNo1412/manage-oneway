<<<<<<< HEAD
import { Controller } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Body, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guard/auth.local.guard";
import { IUserEntity } from "../user/interface/user.interface";
import { UserDecorator } from "src/common/decorators/user.decorators";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: AuthDto })
    async login(
        @UserDecorator() user: IUserEntity
    ) {
        return await this.authService.signIn(user);
    }

    @Post('signUp')
    async signUp(
        @Body() signUpDto: AuthDto
    ): Promise<any> {
        return await this.authService.signUp(signUpDto);
=======
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { User } from "src/common/decorators/user.decorators";
import { IUserEntity } from "../user/interface/user.interface";
import { LocalAuthGuard } from "./guard/auth.local.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@User() user: IUserEntity) {
        return this.authService.login(user);
>>>>>>> feat/PM-auth-26-may
    }
}