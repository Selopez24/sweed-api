import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import UserLoginDTO from './auth/dto/userLogin.dto';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<UserLoginDTO> {
    console.log({ req });

    const { updateDate, ...restUser } = await this.authService.login(req.user);
    return restUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
