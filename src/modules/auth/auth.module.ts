import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule
    ],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule { }