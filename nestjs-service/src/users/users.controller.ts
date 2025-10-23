import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Userinfo } from './Userinfo';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void>{
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);

    return 'email verified';
  }

  @Post('/login')
  async login(@Body() dto:UserLoginDto): Promise<string> {
    console.log(dto);

    return 'login ok';
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId:string): Promise<Userinfo> {
    console.log(userId);

    return { id: userId, name: 'Makima', email: 'chainsaw@man.com' } as Userinfo;
  }
}
