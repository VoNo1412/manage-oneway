import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @Prop()
    password: string;

    @ApiProperty()
    @Prop()
    username: string;
}
export const UserSchema = SchemaFactory.createForClass(User);