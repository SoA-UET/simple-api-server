import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Patch, Delete, SerializeOptions, UseInterceptors, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { OtherApiResponses } from "src/common/decorators/other-api-responses.decorator";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { PutUserDto } from "./dto/put-user.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { PatchUserDTO } from "./dto/patch-user-dto";
import { JwtAuth } from "src/common/decorators/jwt-auth.decorator";

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

    @JwtAuth()
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

    @JwtAuth()
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

    @JwtAuth()
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
}
