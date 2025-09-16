import { Body, ClassSerializerInterceptor, Controller, Get, Put, Patch, Post, SerializeOptions, UseInterceptors, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OtherApiResponses } from "src/common/decorators/other-api-responses.decorator";
import { ParseObjectIdPipe } from "@nestjs/mongoose";

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Lấy danh sách tất cả người dùng trong hệ thống." })
    @ApiResponse({ status: 200, description: "Thành công", type: UserDto, isArray: true })
    @OtherApiResponses()
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Post()
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Đăng ký tài khoản người dùng mới." })
    @ApiResponse({ status: 201, description: "Thành công" })
    @OtherApiResponses()
    async create(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.create(createUserDto);
        return newUser;
    }

    @Put(':id')
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Cập nhật toàn bộ thông tin người dùng." })
    @ApiResponse({ status: 200, description: "Cập nhật thành công", type: UserDto })
    
    @OtherApiResponses()
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Patch(':id')
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Cập nhật một phần thông tin người dùng." })
    @ApiResponse({ status: 200, description: "Cập nhật thành công", type: UserDto })
    @OtherApiResponses()
    patch(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.patch(id, updateUserDto);
    }
}
