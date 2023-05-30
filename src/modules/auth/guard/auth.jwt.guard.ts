import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtHelper } from '../helper/auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtHelper: JwtHelper) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.jwtHelper.extractTokenFromHeader(request);
        try {
            const payload = await this.jwtHelper.verifyToken(token);
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}