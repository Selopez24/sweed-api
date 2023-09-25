import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
