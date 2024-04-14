import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User Controller')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/')
    async getAll() {
        const users = await this.userService.findAll();
        return users;
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (user !== null) {
            return user;
        } else {
            return { message: 'User not found.' };
        }
    }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const result = await this.userService.create(createUserDto);
        return result;
    }
}
