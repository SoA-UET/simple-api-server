import { DeleteUserDto } from "./dto/delete-user.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model, isValidObjectId } from "mongoose";
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

    async findById(id: string): Promise<UserDto | null> {
       // Validate ObjectId format using mongoose's built-in validator
       if (!isValidObjectId(id)) {
           return null;
       }
       return await this.userModel.findById(id).exec();
   }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, PASSWORD_HASH_ROUNDS);
        const newUser = new this.userModel({
            ...createUserDto,
            hashed_password: hashedPassword,
        });
        return newUser.save();
    }

    async deleteUserById(deleteUserDto: DeleteUserDto) {
        const result = await this.userModel.findByIdAndDelete(deleteUserDto.id);
        if (!result) {
            throw new NotFoundException("Không tìm thấy user với id đã cho");
        }
        return { message: "Xóa thành công", id: deleteUserDto.id };
    }
}
