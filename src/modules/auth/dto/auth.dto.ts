import { IsEmail, IsString } from "class-validator";
import { IAuth } from "../interface/auth.interface";

export class AuthDto implements IAuth {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}