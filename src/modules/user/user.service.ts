import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-User.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create({
      ...createUserDto,
      creationDate: new Date(),
    });

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(query: Record<string, unknown>): Promise<User> {
    return this.userModel.findOne(query).exec();
  }

  async findOneAndUpdate(update: Record<string, unknown>): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(update.queryParams, { $set: update.updateData })
      .exec();
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
