import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @ApiProperty({
        example: 'test@gmail.com'
    })
    email: string;

    @ApiProperty({
        example: '1412zzz'
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: 'vono1412'
    })
    @IsString()
    username?: string;
}
