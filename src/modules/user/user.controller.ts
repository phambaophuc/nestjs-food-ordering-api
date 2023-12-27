import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const result = await this.userService.createUser(createUserDto);
        return result;
    }
}
