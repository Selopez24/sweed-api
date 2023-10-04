import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sendEmail } from 'src/email/email';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username, true);

    if (!user)
      throw new HttpException('username was not found', HttpStatus.NOT_FOUND);

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (user && isCorrectPassword) {
      const { password, ...restUser } = user;

      return restUser;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload), ...user };
  }

  async requestResetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const token = this.jwtService.sign({ sub: user.id, email });
    // TODO! pasar a un modulo

    await sendEmail(email, token);

    return {
      message: 'Email sent successfully!',
      userId: user.id,
      email,
      token,
    };
  }

  async confirmResetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    let userId: any;
    try {
      const decodedToken = this.jwtService.verify(token);
      userId = decodedToken.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updateUserPassword(userId, hashedPassword);
    return { message: 'Password reset successfully' };
  }
}
