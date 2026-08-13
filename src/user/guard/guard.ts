import { CanActivate, ExecutionContext, Injectable, Request } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { role } from "../user.customdecoratoe";
import { JwtService } from "@nestjs/jwt"
import { HttpException, UnauthorizedException } from "@nestjs/common/exceptions";
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> { //يبقي الفنكشن هترجع بروميس async/await  طلما مستخدم 
        try {
            console.log('hello phone')
            const roles = this.reflector.get(role, context.getHandler());
            if (!roles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();


            let token = request.cookies.token || request.headers.authorization;
            if (!token) {
                throw new UnauthorizedException(" ");
            }
            if (token.startsWith('Bearer ')) {
                token = token.split('Bearer ')[1];
            }
            if (!roles) {
                return true;
            }
            const payload: any = await this.jwtService.verifyAsync(token, { secret: process.env.secret });
            if (!payload) {
                throw new HttpException("can't find payload", 403);
            }
            if (payload._id && payload.role === 'admin') {
                request['user'] = payload;// هنا ببعت الباي لود في الريكويست بعمل اوبجيكت اسمه يوزر في الريكويست وجوا اوبجيكت الباي لود
                return true;
            }
            if (
                !payload.role ||
                payload.role === '' ||
                !roles.includes(payload.role)
            ) {
                throw new HttpException("not allowed", 403);
            }

            request['user'] = payload;




            return true;
        } catch (error: any) {
            console.log(error);
            throw new HttpException(error, 403);
        }
    }
}
