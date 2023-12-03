import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { SALT_ROUNDS_BCRYPT } from 'src/constants/auth.constants';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
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
    await this.emailService.sendEmail(email, token);

    return token;
  }

  async confirmResetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    let userId: any;
    try {
      const decodedToken = this.jwtService.verify(token);
      userId = decodedToken.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS_BCRYPT);
      await this.usersService.updateUserPassword(userId, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during the password reset process',
      );
    }
    return;
  }
}
