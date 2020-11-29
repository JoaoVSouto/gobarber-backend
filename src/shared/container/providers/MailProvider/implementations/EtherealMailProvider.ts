import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    (async () => {
      const account = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    })();
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const info = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

export default EtherealMailProvider;
