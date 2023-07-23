import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.jwt.guard";
import { RolesGuard } from "../guard/role.guard";
import { Role } from "src/common/interface/role.enum";
import { ROLES_KEY } from "./role.decorator";

export const AuthGuards = (...roles: Role[]) => {
    return applyDecorators(SetMetadata(ROLES_KEY, roles),
        UseGuards(
            AuthGuard,
            RolesGuard
        )
    );
}