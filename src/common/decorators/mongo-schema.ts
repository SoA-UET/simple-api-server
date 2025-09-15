import { SchemaFactory } from '@nestjs/mongoose';

export function createMongoSchema<T>(classRef: new () => T) {
  const schema = SchemaFactory.createForClass(classRef);
  return schema;
}
