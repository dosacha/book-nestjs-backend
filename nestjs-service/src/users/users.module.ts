import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ServiceA } from "../service-A";
import { ServiceB } from "../service-B";
import { BaseService } from "../base-service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, ServiceA, ServiceB, BaseService], // 모듈에 프로바이더를 등록
  exports: [UsersService, ServiceA, ServiceB], // ← AppModule 에서 쓰려면 export 필수
})
export class UsersModule {}
