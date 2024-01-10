import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

dotenv.config();

@Injectable()
export class EmailService {
  private mailgunDomain = process.env.MAILGUN_DOMAIN as string;
  private mailgunApiKey = process.env.MAILGUN_API_KEY as string;
  private client;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.client = mailgun.client({ username: 'api', key: this.mailgunApiKey });
  }

  async sendEmail(email: string, token: string): Promise<void> {
    const resetLink = `sweed://reset-password?token=${token}`;

    const emailData = {
      from: 'costeecon@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `This is for resetting your password. Here is your token: ${token}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. ${resetLink} If you don't have our app installed, please download it from the app/play store.</p>`,
    };

    try {
      await this.client.messages.create(this.mailgunDomain, emailData);
    } catch (err) {
      console.error(err);
    }
  }
}
