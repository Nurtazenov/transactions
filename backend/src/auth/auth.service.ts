import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto, refreshJwtDto } from './dto/jwt.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ){}
    async login (params: SignInDto): Promise<JwtDto>{
        const isPasswordCorrect = await this.accountService.verification(
            params
        )
        if(!isPasswordCorrect){
            throw new UnauthorizedException()
        }
        const users = await this.accountService.GetUsersByFilter({
            login: params.login
        });

        const payload = { login: params.login, userId: users.items[0].userId};
        const access = this.jwtService.sign(payload, {
            secret:this.config.get("JWT_ACCESS_SECRET"),
            algorithm: this.config.get("JWT_ALG"),
            expiresIn: this.config.get("JWT_ACCESS_EXP")
        })
        const refresh = this.jwtService.sign(payload, {
            secret:this.config.get("JWT_REFRESH_SECRET"),
            algorithm: this.config.get("JWT_ALG"),
            expiresIn: this.config.get("JWT_REFRESH_EXP")
        })
        return {
            access, refresh,
        }
    }
    async refreshToken(params: refreshJwtDto): Promise<JwtDto>{
        let jwtPayload: {
            userId: string;
            login: string
        }
        try {
            jwtPayload = this.jwtService.verify(params.refresh, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                algorithms: this.config.get('JWT_ALG')
            })
        } catch (error: unknown){
            throw new UnauthorizedException()
        }
        const {items: users} = await this.accountService.GetUsersByFilter (
            {
                userIds:[jwtPayload.userId],
            },
        )
        if(users.length){
            throw new NotFoundException('Пользователь не найден')
        }
            const payload = {login:users[0].login, userId: users[0].userId};
            const access = this.jwtService.sign(payload, {
                secret: this.config.get('JWT_ACCESS_SECRET'),
                algorithm: this.config.get("JWT_ALG"),
                expiresIn:this.config.get("JWT_ACCESS_EXP"),
            })
            const refresh = this.jwtService.sign(payload, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                algorithm: this.config.get("JWT_ALG"),
                expiresIn:this.config.get("JWT_REFRESH_EXP"),
            })
            return { access, refresh}
        }
}
