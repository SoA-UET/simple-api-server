import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { createMongoSchema } from "src/common/decorators/mongo-schema";

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    hashed_password: string;

    @Prop({ required: true })
    full_name: string;
}

export type UserDocument = User & Document;

export const UserSchema = createMongoSchema(User);
