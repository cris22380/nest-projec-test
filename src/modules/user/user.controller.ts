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
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const result = await this.userService.create({
      ...createUserDto,
      hashedPassword,
    });

    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  @Put()
  async findOneAndUpdate(@Body() query: Record<string, any>) {
    await this.userService.findOneAndUpdate(query);
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/v1/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/v1/logout')
  logout(@Request() req): any {
    console.log(req.session, 'asdasdasdasd')
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
