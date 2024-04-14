import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
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


}
