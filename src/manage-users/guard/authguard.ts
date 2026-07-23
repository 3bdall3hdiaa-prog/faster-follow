import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import Roles from 'src/decorator/decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const check = request.headers.authorization
        if (!check) {
            throw new HttpException('wrong token', 402);
        }
        const token = request.headers.authorization.split(" ")[1] || request.headers.authorization || this.extractTokenFromHeader(request);
        console.log(token);
        if (!token) {
            throw new HttpException('Unauthorized', 401);
        }
        //bearer token م بيبقي مبعوت كداBearer  في حالة انو بعت التوكن في 
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) {
            return true;
        }


        // try {
        const payload = await this.jwtService.verifyAsync(token);
        if (!payload) {
            throw new HttpException('not payload', 401);
        }
        // بقولوا لو الوظيفه ادمن عدي الجارد علطول
        if (payload._id && payload.role.toLowerCase() === 'admin') { // لو في ايدي في الباي لود اعمل الكلام ده
            request['user'] = payload;// هنا ببعت الباي لود في الريكويست بعمل اوبجيكت اسمه يوزر في الريكويست وجوا اوبجيكت الباي لود
            return true;
        }
        //ابعت ايرور decorator لو في وظيفه مبعوته والوظيفه دي مش موجوده في ال
        if (
            !payload.role ||
            payload.role === '' ||
            !roles.includes(payload.role)
        ) {
            throw new HttpException('لا يوجد صلاحية لهذا المستخدم', 401);
        }
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        // } catch {
        //     throw new UnauthorizedException("ff");
        // }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
