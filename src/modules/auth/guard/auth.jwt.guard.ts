import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtHelper } from "../helper/jwt.helper";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtHelper: JwtHelper
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = await this.jwtHelper.getTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtHelper.verifyToken(token);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}