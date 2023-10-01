import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import UserLoginDTO from './auth/dto/userLogin.dto';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public';
import { ResetPasswordConfirmDTO, ResetPasswordDTO } from './interfaces';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<UserLoginDTO> {
    const { updateDate, ...restUser } = await this.authService.login(req.user);
    return restUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('auth/reset-password')
  async requestResetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.requestResetPassword(resetPasswordDTO.email);
  }

  @Public()
  @Post('auth/reset-confirm')
  async confirmResetPassword(
    @Body() resetPasswordConfirmDTO: ResetPasswordConfirmDTO,
  ) {
    return this.authService.confirmResetPassword(
      resetPasswordConfirmDTO.token,
      resetPasswordConfirmDTO.newPassword,
    );
  }
}
