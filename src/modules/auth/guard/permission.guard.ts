import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permissions } from "src/common/interface/role.enum";
import { PERMISSION_KEY } from "../decorators/permission.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }
    async canActivate(context: ExecutionContext): Promise<any> {
        const { user } = context.switchToHttp().getRequest();
        const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions) {
            return true;
        }
        
        if (!user) return false;
        const isPermission = user?.role && user?.permissions.includes(requiredPermissions[0]);
        return isPermission;
    }
}