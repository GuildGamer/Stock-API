import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: AuthDto){
        const hash = await argon.hash(dto.password);

        try { 
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })

            return this.signToken(user.id, user.email)

        } catch (err) {
            if (err.code === "P2002"){
                throw new ForbiddenException(
                    'Credentials taken',
                )
            }
        }
    }

    async signin(dto: AuthDto){
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if(!user)
            throw new ForbiddenException('No such user');

        const passMatches = await  argon.verify(
            user.hash,
            dto.password
        )

        if(!passMatches)
            throw new ForbiddenException('Invalid credentials');

        return this.signToken(user.id, user.email)
    }

    async signToken(
        userId: number,
        email: string
    ): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: this.config.get("JWT_SECRET")
        })

        return {
            access_token: token,
        }
    }
}