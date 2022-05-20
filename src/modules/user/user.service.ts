import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from './dto/create-User.dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUserQuery, IUserUpdate } from './interface/user.interfaces';
import * as bcrypt from 'bcrypt';
import { pseudoRandomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const verifyEmail = await this.findOne({ email: createUserDto.email });

    if (verifyEmail) {
      throw new Error('email already used');
    }

    const userId = new Types.ObjectId();
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const code = await pseudoRandomBytes(16).toString('hex');

    return await this.userModel.create({
      ...createUserDto,
      username: createUserDto.username.toLowerCase(),
      creationDate: new Date(),
      _id: userId,
      id: userId.toHexString(),
      hashedPassword,
      code,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(query: IUserQuery): Promise<User> {
    return this.userModel.findOne(query).exec();
  }

  async findOneAndUpdate(update: IUserUpdate): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(update.queryParams, {
        $set: update.updateData,
      })
      .exec();
  }

  async delete(email: string) {
    return await this.userModel.findOneAndDelete({ email }).exec();
  }
}
