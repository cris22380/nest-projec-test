import { UpdateUserDto } from '../dto/update-user.dto';
import { ObjectId } from 'mongoose';

export interface IUserQuery {
  _id?: string | ObjectId;
  id?: string;
  username?: string;
  email?: string;
}

export interface IUserUpdate {
  queryParams: IUserQuery;
  updateData: UpdateUserDto;
}
