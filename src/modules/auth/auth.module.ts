import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/auth.local.strategy";
import { JwtStrategy } from "./strategy/auth.jwt.strategy";
import { JwtHelper } from "./helper/auth.helper";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.jwt.guard";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'local' }),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                console.log(configService.get('SECRET'))
                return ({
                    secret: configService.get('SECRET'),
                    signOptions: {
                        expiresIn: configService.get('TOKEN_EXPRIRES_TIME') + 's'
                    }
                })
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtHelper, AuthGuard, JwtService],
    exports: [AuthService, JwtHelper, AuthGuard, JwtService]
})

export class AuthModule { }