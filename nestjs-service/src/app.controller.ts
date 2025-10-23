import type { Request } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
  Res,
  Header,
  Redirect,
  Query,
  Delete,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';


@Controller('/users') // @Controller 데커레이터를 선언하여 해당 클래스가 컨트롤러의 역할을 하게 함
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
  }

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  // @Get('/hello') // @Get 데커레이터로 라우팅 경로를 관리
  // getHello2(@Req() req: Request): string {
  //   console.log(req);
  //   return this.appService.getHello();
  // }

  // Express를 사용한다면 @Res 데커레이터를 이용하여 라이브러리별 응답 객체를 직접 다룰 수 있다.
  // @Get('')
  // findAll(@Res() res){
  //   const users = this.usersService.findAll();

  //   return res.status(200).send(users);
  // }

  // CRUD의 상태 코드를 바꾸는 방법 
  // @HttpCode(202)
  // @Patch('/users/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // 요청을 처리하는 도중 에러가 발생하거나 예외를 던져야 할 경우
  // @Get('/:id')
  // findOne(@Param('id') id: string){
  //   if(+id < 1){
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  //   }
  //   return this.usersService.findOne(+id);
  // }

  // @Header: 응답에 커스텀 헤더를 추가
  // @Header('Custom', 'Test Header')
  // @Get('/:id')
  // findOneWithHeader(@Param('id') id:string){
  //   return this.usersService.findOne(+id);
  // }

  // @Redirect
  // @Redirect('https://nestjs.com', 302)
  // @Get(':id')
  // findOne(@Param('id') id:string){
  //   return this.usersService.findOne(+id);
  // }

  // 동적 리디렉트
  // @Get('redirect/docs')
  // @Redirect('https://nestjs.com', 302)
  // getDocs(@Query('version') version){
  //   if(version && version =='5'){
  //     return { url: 'https://docs.netjs.com/v5/' };
  //   }
  // }

  // @Delete
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string,
  ){
    return `userId: ${userId}, memoId: ${memoId}`;
  }

  
}
