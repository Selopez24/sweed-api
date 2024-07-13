import { Body, Controller, Get, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public';
import ResetPasswordDTO from './dto/resetPassword.dto';
import ResetPasswordConfirmDTO from './dto/passwordConfirm.dto';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guard';
import UserLoginDTO from './dto/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<UserLoginDTO> {
    const { updateDate, ...restUser } = await this.authService.login(req.user);
    return restUser;
  }

  @Public()
  @Post('reset-password')
  async requestResetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const token = await this.authService.requestResetPassword(resetPasswordDTO.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email sent successfully!',
      data: {
        token,
      },
    };
  }

  @Public()
  @Post('reset-confirm')
  async confirmResetPassword(@Body() resetPasswordConfirmDTO: ResetPasswordConfirmDTO) {
    await this.authService.confirmResetPassword(
      resetPasswordConfirmDTO.token,
      resetPasswordConfirmDTO.newPassword,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset successfully',
      data: null,
    };
  }
}
