import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, SerializeOptions, UseInterceptors, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OtherApiResponses } from "src/common/decorators/other-api-responses.decorator";

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
}
