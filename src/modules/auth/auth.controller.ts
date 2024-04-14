import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './dto/login-request.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth Controller')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() req: LoginRequest) {
        return this.authService.login(req);
    }

    @Post('/signup')
    async register(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const result = await this.userService.create(createUserDto);
        return result;
    }
}
