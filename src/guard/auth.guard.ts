import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('stock-jwt'){
    constructor(){
        super(); 
    }
}