import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto, refreshJwtDto } from './dto/jwt.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body() dto:SignInDto):Promise<JwtDto>{
        return this.authService.login(dto);
    }

    @Post('refresh/token')
    refreshToken(@Body() dto: refreshJwtDto):Promise<JwtDto>{
        return this.authService.refreshToken(dto)
    }
}
