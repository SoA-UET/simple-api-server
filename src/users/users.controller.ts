import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Patch, Delete, Head, SerializeOptions, UseInterceptors, NotFoundException, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { OtherApiResponses } from "src/common/decorators/other-api-responses.decorator";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { PutUserDto } from "./dto/put-user.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { PatchUserDTO } from "./dto/patch-user-dto";
import type { Response } from 'express';

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

    @Get(':id')
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Lấy thông tin người dùng theo ID." })
    @ApiResponse({ status: 200, description: "Thành công", type: UserDto })
    @ApiResponse({ status: 404, description: "Không tìm thấy người dùng" })
    @OtherApiResponses()
    async findById(@Param('id') id: string): Promise<UserDto> {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException('Không tìm thấy người dùng với ID này');
        }
        return user;
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
    put(@Param('id', ParseObjectIdPipe) id: string, @Body() putUserDto: PutUserDto) {
        return this.usersService.put(id, putUserDto);
    }

    @Patch(':id')
    @SerializeOptions({
        type: UserDto
    })
    @ApiOperation({ summary: "Cập nhật một phần thông tin người dùng." })
    @ApiResponse({ status: 200, description: "Cập nhật thành công", type: UserDto })
    @OtherApiResponses()
    patch(@Param('id', ParseObjectIdPipe) id: string, @Body() patchUserDto: PatchUserDTO) {
        return this.usersService.patch(id, patchUserDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Xóa user theo id." })
    @ApiParam({ name: "id", description: "Id của user", type: String })
    @ApiResponse({ status: 200, description: "Xóa thành công" })
    @ApiResponse({ status: 404, description: "Không tìm thấy người dùng" })
    @OtherApiResponses()
    async deleteUser(@Param("id") id: string) {
        const dto = new DeleteUserDto(id);
        return this.usersService.deleteUserById(dto);
    }

    @Head(':id')
    @ApiOperation({ summary: "Kiểm tra user theo ID có tồn tại không (HEAD method)" })
    @ApiParam({ name: "id", description: "Id của user", type: String })
    @ApiResponse({ status: 200, description: "User tồn tại" })
    @ApiResponse({ status: 404, description: "User không tồn tại" })
    @OtherApiResponses()
    async headUser(@Param('id') id: string, @Res() res: Response): Promise<void> {
        // HEAD method cho user cụ thể - kiểm tra existence
        try {
            const user = await this.usersService.findById(id);
            if (user) {
                res.status(200).send();
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(404).send();
        }
    }
}
