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

            console.log('========== AUTH DEBUG ==========');
            console.log('METHOD:', request.method);
            console.log('URL:', request.originalUrl);
            console.log('ORIGIN:', request.headers.origin);
            console.log('COOKIES:', request.cookies);
            console.log('TOKEN EXISTS:', !!request.cookies?.token);
            console.log('================================');
            const token = request.cookies.token
            if (!token) {
                throw new UnauthorizedException(" ");
            }
            console.log('token received', token)

            if (!roles) {
                return true;
            }
            const payload: any = await this.jwtService.verifyAsync(token, { secret: process.env.secret });
            if (!payload) {
                throw new HttpException("can't find payload", 403);
            }
            // بقولوا لو الوظيفه ادمن عدي الجارد علطول
            if (payload._id && payload.role === 'admin') { // لو في ايدي في الباي لود اعمل الكلام ده
                request['user'] = payload;// هنا ببعت الباي لود في الريكويست بعمل اوبجيكت اسمه يوزر في الريكويست وجوا اوبجيكت الباي لود
                return true;
            }
            //ابعت ايرور ولو مفيش وظيفه مبعوته ابعت ايرورdecorator لو في وظيفه مبعوته والوظيفه دي مش موجوده في ال 
            if (
                !payload.role ||
                payload.role === '' ||
                !roles.includes(payload.role)
            ) {
                throw new HttpException("not allowed", 403);
            }
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;




            return true;
        } catch (error: any) {
            console.log(error);
            throw new HttpException(error, 403);
        }
    }
}
