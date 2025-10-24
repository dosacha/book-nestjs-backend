import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
    private readonly usersByEmail = new Map<string, { name: string; password: string; signupVerifyToken: string }>();

    constructor(private emailService: EmailService) {}

    async createUser(name: string, email: string, password: string){
        await this.checkUserExists(email); // 가입하료는 유저가 존재하는지 검사

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken); // 유저를 DB에 저장
        await this.sendMemberJoinEmail(email, signupVerifyToken); // 가입 인증 이메일 발송    
    }

    private checkUserExists(email: string){
        if (this.usersByEmail.has(email)) {
            throw new Error('이미 가입된 사용자입니다.');
        }
    }
    
    private saveUser(name: string, email: string, password: string, signupVerifyToken: string){
        this.usersByEmail.set(email, { name, password, signupVerifyToken });
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = this.usersByEmail.get(userId);

    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.');
    }

    return {
      id: userId,
      name: user.name,
      email: userId,
    };
  }
}
