import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UserDto } from "./dto/user.dto";
import { plainToInstance } from "class-transformer";

const PASSWORD_HASH_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findAll(): Promise<UserDto[]> {
        return await this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, PASSWORD_HASH_ROUNDS);
        const newUser = new this.userModel({
            ...createUserDto,
            hashed_password: hashedPassword,
        });
        return newUser.save();
    }
}
