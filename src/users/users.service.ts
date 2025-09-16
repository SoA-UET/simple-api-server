import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
        const updateData: any = { ...updateUserDto };

    if (updateUserDto.password) {
        updateData.hashed_password = await bcrypt.hash(updateUserDto.password, PASSWORD_HASH_ROUNDS);
        delete updateData.password;
    }

    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async patch(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
        const updateData: any = { ...updateUserDto };

        if (updateUserDto.password) {
            updateData.hashed_password = await bcrypt.hash(updateUserDto.password, PASSWORD_HASH_ROUNDS);
            delete updateData.password;
        }

        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
}
