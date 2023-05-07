import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsString } from "class-validator";

export class CreateUserDto {
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
    @Allow()
    username?: string;
}
