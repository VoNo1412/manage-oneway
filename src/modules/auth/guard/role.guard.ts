import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/interface/role.enum";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }
    async canActivate(context: ExecutionContext): Promise<any> {
        const { user } = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        
        if (!user) return false;
        const isRole = user?.role && requiredRoles.includes(user.role);
        return isRole;
    }
}