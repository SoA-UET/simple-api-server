import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidationErrorResponseDTO } from '../dto/validation-error-response.dto';
import { InternalServerErrorResponseDTO } from '../dto/internal-error-response.dto';

export function OtherApiResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng',
      type: ValidationErrorResponseDTO,
    }),

    ApiResponse({
      status: 500,
      description: 'Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.',
      type: InternalServerErrorResponseDTO,
    })
  );
}
