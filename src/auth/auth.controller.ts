import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ResetPasswordDTO,
  ResetPasswordConfirmDTO,
} from '../interfaces/authInterfaces';
import { Public } from 'src/decorators/public';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Public()
  @Post('reset-password')
  async requestResetPassword(
    @Body() resetPasswordDTO: ResetPasswordDTO,
    @Res() res: Response,
  ) {
    const result = await this.authService.requestResetPassword(
      resetPasswordDTO.email,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: result.message,
      data: {
        token: result.token,
      },
    });
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
