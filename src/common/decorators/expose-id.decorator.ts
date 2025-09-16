import { Expose, Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

export function ExposeId() {
  return applyDecorators(
    Expose(),
    Transform(({ obj }) => obj._id?.toString() || obj.id?.toString())
  );
}
