import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryUserDto {
    @ApiPropertyOptional({ isArray: true, type: Array })
    @IsOptional()
    fileIds?: string[]
}