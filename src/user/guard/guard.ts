import { CanActivate, ExecutionContext, Injectable, Request } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { role } from "../user.customdecoratoe";
import { JwtService } from "@nestjs/jwt"
import { HttpException, UnauthorizedException } from "@nestjs/common/exceptions";
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> { //يبقي الفنكشن هترجع بروميس async/await  طلما مستخدم 
        const roles = this.reflector.get(role, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        // const token = request.headers.authorization
        const token = request.headers.authorization.split(' ')[1];
        console.log(token);
        console.log(roles);

        if (!roles) {
            return true;
        }
        if (!token) {
            throw new UnauthorizedException(" ");
        }

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.secret });
        console.log(payload);
        if (!payload) {
            throw new HttpException("can't find payload", 403);
        }
        // بقولوا لو الوظيفه ادمن عدي الجارد علطول
        if (payload._id && payload.role.toLowerCase() === 'admin') { // لو في ايدي في الباي لود اعمل الكلام ده
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
    }
}
