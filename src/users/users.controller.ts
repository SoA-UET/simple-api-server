import { Body, ClassSerializerInterceptor, Controller, Get, Post, Delete, Param, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { OtherApiResponses } from "src/common/decorators/other-api-responses.decorator";
import { DeleteUserDto } from "./dto/delete-user.dto";

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

    @Delete(":id")
    @ApiOperation({ summary: "Xóa user theo id." })
    @ApiParam({ name: "id", description: "Id của user", type: String })
    @ApiResponse({ status: 200, description: "Xóa thành công" })
    @OtherApiResponses()
    async deleteUser(@Param("id") id: string) {
        const dto = new DeleteUserDto(id);
        return this.usersService.deleteUserById(dto);
    }
}
