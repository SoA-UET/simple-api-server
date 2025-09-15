import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDTO {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: ['Email không hợp lệ', 'Mật khẩu phải chứa ít nhất 8 ký tự'],
    isArray: true,
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
