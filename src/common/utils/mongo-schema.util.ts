import { SchemaFactory } from '@nestjs/mongoose';

export function createMongoSchema<T>(classRef: new () => T) {
  const schema = SchemaFactory.createForClass(classRef);

  schema.virtual('id').get(function () {
    return (this as any)?._id?.toHexString();
  });

  return schema;
}
