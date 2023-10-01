export interface ResetPasswordDTO {
  email: string;
}
export interface ResetPasswordConfirmDTO {
  token: string;
  newPassword: string;
}
