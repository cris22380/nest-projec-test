import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { LocalAuthGuard } from '#modules/auth/local-auth.guard';
import { AuthenticatedGuard } from '#modules/auth/authenticated.guard';
import { IUserUpdate } from './interface/user.interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const verifyEmail = await this.userService.findOne({
      email: createUserDto.email,
    });

    if (verifyEmail) {
      throw new Error('email already used');
    }
    const result = await this.userService.create({
      ...createUserDto,
    });

    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  @Put()
  async findOneAndUpdate(@Body() query: IUserUpdate, @Session() session: any) {
    const { updateData } = query;
    const {
      passport: { user },
    } = session;

    await this.userService.findOneAndUpdate({
      queryParams: { id: user.id },
      updateData,
    });
    return {
      userEdited: { id: user.id, dataEdited: updateData },
    };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ _id: id });
  }

  @Get('/username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findOne({ username });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
    return { deletedUserByid: id };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/session/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/session/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
