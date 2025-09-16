import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsEmail(undefined, {
        message: "Email không hợp lệ.",
    })
    readonly email?: string;

    @ApiProperty()
    @IsOptional()
    readonly full_name?: string;

    @ApiProperty()
    @IsOptional()
    @MinLength(8, {
        message: "Mật khẩu phải có tối thiểu 8 ký tự.",
    })
    readonly password?: string;
}
