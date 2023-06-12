import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { IUserEntity } from "../user/interface/user.interface";
import { LocalAuthGuard } from "./guard/auth.local.guard";
import { User } from "src/common/decorators/user.decorators";

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
    }
}