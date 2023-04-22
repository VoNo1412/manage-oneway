import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @ApiProperty({
        example: 'test@gmail.com'
    })
    email: string;

    @ApiProperty({
        example: '1412zzz'
    })
    password: string;

    @Expose({
        name: 'user_name'
    })
    @ApiProperty({
        example: 'vono1412'
    })
    username?: string;
}
