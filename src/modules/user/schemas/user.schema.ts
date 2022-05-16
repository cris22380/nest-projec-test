import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  first: string;

  @Prop()
  last: string;

  @Prop()
  location: string;

  @Prop()
  locale: string;

  @Prop()
  gender: string;

  @Prop()
  accessToken: string;

  @Prop(raw({ done: { type: Number } }))
  tutorial: Record<string, any>;

  @Prop()
  isBusiness: boolean;

  @Prop()
  roles: string;

  @Prop()
  collapsed: string;

  @Prop()
  code: string;

  @Prop()
  hashedPassword: string;

  @Prop()
  emailPrev: string;

  @Prop()
  creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
