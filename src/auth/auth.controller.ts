import { Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { MyController } from 'src/common/decorators/my-controller';
import { MyPost } from 'src/common/decorators/routing/my-post.decorator';

@MyController({
    prefix: 'auth',
})
export class AuthController {
    constructor(private authService: AuthService) { }

    @MyPost({
        path: 'login',
        summary: 'Đăng nhập và nhận token JWT.',
        response: {
            status: 200,
            description: 'Thành công',
            type: LoggedInUserDto,
        },
        otherResponses: [
            {
                status: 401,
                description: 'Email hoặc mật khẩu không đúng',
            },
        ],
    })
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
