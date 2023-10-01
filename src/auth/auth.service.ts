import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sendEmail } from 'src/email/email';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username, true);

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (user && isCorrectPassword) {
      const { password, ...restUser } = user;

      return restUser;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async requestResetPassword(email: string) {
    console.log({ email });
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const token = this.jwtService.sign({ sub: user.id, email });
    console.log({ token });

    const res = sendEmail(email, token);

    return { user, token, email };
  }
  async confirmResetPassword(
    token: string,
    newPassword: string,
  ): Promise<string> {
    let userId: any;

    console.log({ token });

    try {
      const decodedToken = this.jwtService.verify(token);
      userId = decodedToken.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log({ hashedPassword });

    await this.usersService.updateUserPassword(user.id, hashedPassword);

    return 'Password reset successfully';
  }
}
