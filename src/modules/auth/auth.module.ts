import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/auth.local.strategy";
import { JwtStrategy } from "./strategy/auth.jwt.strategy";
import { JwtHelper } from "./helper/auth.helper";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.jwt.guard";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'local' }),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET,
            signOptions: {
                expiresIn: '3600s'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtHelper, AuthGuard],
    exports: [AuthService, JwtHelper, AuthGuard]
})

export class AuthModule { }