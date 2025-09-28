import { Body, Controller, HttpCode, Post, SerializeOptions, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OtherApiResponses } from 'src/common/decorators/other-api-responses.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    @SerializeOptions({
        type: LoggedInUserDto
    })
    @ApiOperation({ summary: 'Đăng nhập và nhận token JWT.' })
    @ApiResponse({ status: 200, description: 'Thành công', type: LoggedInUserDto })
    @OtherApiResponses()
    async login(@Body() loginUserDto: LoginUserDto): Promise<LoggedInUserDto> {
        const user = await this.authService.validateUser(
            loginUserDto.email,
            loginUserDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const accessToken = await this.authService.issueAccessToken(user);
        return {
            accessToken,
            user,
        }
    }
}
