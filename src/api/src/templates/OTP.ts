import { Attachment } from 'nodemailer/lib/mailer';
import path from 'path';

export type OTPTemplateOptions = {
  title?: string;
  expirationMsg?: string;
  description?: string;
  disclamerMsg?: string;
  otp: string;
};

export type OTPTemplateResult = {
  template: string;
  attachments: Attachment[] | [];
};

class OTPTemplate {
  projectName = 'Gestor de Condomínio';

  #getLogoAttachment(): Attachment {
    const logoPath = path.join(
      process.env.projectDir || '',
      'src',
      'assets',
      'building.jpg'
    );
    const attachment: Attachment = {
      cid: 'building',
      filename: 'logo-icon.jpg',
      path: logoPath,
    };
    return attachment;
  }
  #getOpts(options: OTPTemplateOptions) {
    return {
      title: 'Código de verificação',
      expirationMsg: 'Válido por 5 (cinco) minutos',
      description: `Este é o código para verificar o seu usuário no ${this.projectName}.`,
      disclamerMsg:
        '\n' +
        [
          'O código é único e válido para uma única entrada. Não entramos em contato com você por telefone, SMS ou Whatsapp.',
          'Para deixar sua conta ainda mais segura, não compartilhe o código com outra pessoa.',
        ].join('\n') +
        '\n',
      ...options,
    };
  }
  build(options: OTPTemplateOptions): OTPTemplateResult {
    const templateOpts = this.#getOpts(options);
    const logo =
      '<img width="30" src="cid:building" style="margin-right: 10px">';
    const template = `
    <div style='background-color: #fafafa'>
      <div style='margin: 0px auto; max-width: 600px; background: #ffffff'>
        <div>
          <div
            style='
              max-width: 335px;
              margin: auto;
              margin-bottom: 32px;
              margin-top: 32px;
            '
          >
            <table>
              <tr>
                  <td>
                    ${logo}
                  </td>
                  <td>
                      <span
                  style='font-family: Roboto, sans-serif; font-size: 28px; font-weight: 700;'>
                  ${this.projectName}
              </span>
                  </td>
              </tr>
            </table>
          </div>
        </div>
        <div
          style='background-color: #3953a4; padding: 32px; text-align: center; color: #fafafa; font-weight: 600; font-family: \"Open Sans\", sans-serif;'
        >
          <span
            style='
              color: #fafafa;
              text-align: center;
              font-family: \"Open Sans\", sans-serif;
              font-size: 20px;
              font-weight: 600;
              line-height: 30px;
              text-align: center;
            '
            >${templateOpts.title}</span
          >
        </div>
        <div
          style='
            color: #323232;
            font-family: sans-serif;
            font-size: 13px;
            font-weight: normal;
            line-height: 23.4px;
            text-align: center;
            padding: 32px;
          '
        >
          <span>${templateOpts.description}<br />
            <strong>${templateOpts.expirationMsg}</strong>
          </span>
        </div>
        <div
          style='text-align: center; padding: 32px; background-color: #fafafa'
        >
          <span
            style='
              text-decoration: none;
              text-align: center;
              color: #000000;
              font-family: Roboto, sans-serif;
              font-size: 32px;
              font-weight: 700;
              line-height: 120%;
              text-transform: none;
              margin: 0px;
              letter-spacing: 16px;
            '
            >${templateOpts.otp}</span
          >
        </div>
        <div
          style='
            color: #323232;
            font-family: 'Open Sans', sans-serif;
            font-size: 13px;
            font-weight: normal;
            line-height: 23.4px;
            text-align: left;
            padding: 16px;
          '
        >
          <p style='margin: 0'>
            <span style='color: #525252; text-align: justify'
              ><strong>Importante:</strong> ${templateOpts.disclamerMsg}</span
            >
          </p>
        </div>
      </div>
    </div>
`;
    return {
      template,
      attachments: [this.#getLogoAttachment()],
    };
  }
}

const instance = new OTPTemplate();
export { instance as OTPTemplate };
