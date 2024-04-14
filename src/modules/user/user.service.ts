import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const user = await new this.userModel(createUserDto);
        return await user.save();
    }

    async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find();
    }

    async findOne(query: object): Promise<UserDocument> {
        return await this.userModel.findOne(query);
    }

    async findById(id: string): Promise<UserDocument> {
        return await this.userModel.findById(id).exec();
    }
}
