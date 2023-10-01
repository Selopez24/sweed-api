import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ec7d51f40c7bd1',
    pass: 'ff2c31832e5c51',
  },
});

export const sendEmail = (email: string, token: string) => {
  const resetLink = `http://yourdomain.com/reset-password?token=${token}`;
  const resetMessage = {
    from: email,
    to: 'feedmite@hotmail.com',
    subject: 'resetPassword',
    text: `this is for reset your password here is your token ${token}`,
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  };

  transport.sendMail(resetMessage, (err, info) => {
    if (err) {
      console.log({ err });
    } else {
      console.log({ info });
    }
  });
};
