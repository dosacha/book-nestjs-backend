import type { Request } from 'express';
import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { privateDecrypt } from 'crypto';
import { ServiceB } from './service-B'; // ← 반드시 import


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serviceB: ServiceB
  ) { }

  @Get()
  getHelloC(): string{
    return this.serviceB.getHello();
  }

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  @Get('/hello')
  getHello2(): string {
    return this.appService.getHello();
  }

  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
