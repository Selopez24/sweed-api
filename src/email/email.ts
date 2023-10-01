import * as dotenv from 'dotenv';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

dotenv.config();

const mailgunDomain = process.env.MAILGUN_DOMAIN as string;
const mailgunApiKey = process.env.MAILGUN_API_KEY as string;

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: mailgunApiKey });

export const sendEmail = async (email: string, token: string) => {
  const resetLink = `http://yourdomain.com/reset-password?token=${token}`;

  const emailData = {
    from: 'costeecon@gmail.com',
    to: email,
    subject: 'resetPassword',
    text: `This is for resetting your password. Here is your token: ${token}`,
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  };

  try {
    await client.messages.create(mailgunDomain, emailData);
  } catch (err) {
    console.error(err);
  }
};
