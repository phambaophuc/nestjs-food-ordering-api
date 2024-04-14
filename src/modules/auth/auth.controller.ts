import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './dto/login-request.dto';

@Controller('auth')
@ApiTags('Auth Controller')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() req: LoginRequest) {
        return this.authService.login(req);
    }
}
