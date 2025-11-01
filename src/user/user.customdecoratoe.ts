import { Reflector } from "@nestjs/core";
export const role = Reflector.createDecorator<string[]>()
