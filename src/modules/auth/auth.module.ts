import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { jwtSecret } from "./constants/secretjwt.constant";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtHelper } from "./helper/jwt.helper";

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        ConfigModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtSecret.secret,
            signOptions: { expiresIn: `1d` }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtHelper],
    exports: [AuthService, JwtHelper]
})
export class AuthModule { }