import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ResetPasswordDTO,
  ResetPasswordConfirmDTO,
} from '../interfaces/authInterfaces';
import { Public } from 'src/decorators/public';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Public()
  @Post('reset-password')
  async requestResetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.requestResetPassword(resetPasswordDTO.email);
  }

  @Public()
  @Post('reset-confirm')
  async confirmResetPassword(
    @Body() resetPasswordConfirmDTO: ResetPasswordConfirmDTO,
  ) {
    return this.authService.confirmResetPassword(
      resetPasswordConfirmDTO.token,
      resetPasswordConfirmDTO.newPassword,
    );
  }
}
