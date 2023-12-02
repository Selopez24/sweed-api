import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public';
import ResetPasswordDTO from './dto/resetPassword.dto';
import ResetPasswordConfirmDTO from './dto/passwordConfirm.dto';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Public()
  @Post('reset-password')
  async requestResetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const token = await this.authService.requestResetPassword(
      resetPasswordDTO.email,
    );
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
  async confirmResetPassword(
    @Body() resetPasswordConfirmDTO: ResetPasswordConfirmDTO,
  ) {
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
