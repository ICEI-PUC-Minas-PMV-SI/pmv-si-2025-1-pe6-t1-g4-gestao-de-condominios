import nodemailer, { TransportOptions, SendMailOptions } from 'nodemailer';
import { google } from 'googleapis';
import { Attachment } from 'nodemailer/lib/mailer';

export type SMTPProviderOpts = {
  subject: string;
  body: string;
  attachments: Attachment[];
  to: string;
};

class SMTPProvider {
  async createTransporter() {
    const {
      MAIL_CLIENT_ID: clientId,
      MAIL_CLIENT_SECRET: clientSecret,
      MAIL_REFRESH_TOKEN: refreshToken,
      MAIL_USER_EMAIL: user,
    } = process.env;

    try {
      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user,
          accessToken,
          clientId,
          clientSecret,
          refreshToken,
        },
      } as TransportOptions);
      return transporter;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  async sendMail({ body, subject, to, attachments = [] }: SMTPProviderOpts) {
    const { MAIL_USER_EMAIL, MAIL_DEFAULT_RECIPIENT } = process.env;

    try {
      const mailOptions: SendMailOptions = {
        from: MAIL_USER_EMAIL,
        to: to || MAIL_DEFAULT_RECIPIENT,
        subject: subject,
        html: body,
        attachments,
      };

      let emailTransporter = await this.createTransporter();
      await emailTransporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
}

const instance = new SMTPProvider();
export { instance as SMTPProvider };
