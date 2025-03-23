import crypto from 'crypto';
import { TOTP } from 'otpauth';
import base32Encode from 'base32-encode';
import ms from 'ms';

class OTPUtil {
  generateSecret(input?: string, length: number = 32): string {
    let buffer: Buffer;

    if (input) {
      const hash = crypto.createHash('sha256').update(input).digest();
      buffer = Buffer.alloc(length);
      for (let i = 0; i < length; i++) {
        buffer[i] = hash[i % hash.length];
      }
    } else {
      buffer = crypto.randomBytes(length);
    }

    return base32Encode(buffer, 'RFC4648').replace(/=/g, '');
  }

  generate(secret: string, period: number = 30): string {
    const totp = new TOTP({
      secret,
      algorithm: 'SHA1',
      digits: 6,
      period,
    });
    return totp.generate();
  }

  verify(token: string, secret: string, window: number = 0, period: number = 30): boolean {
    const totp = new TOTP({
      secret,
      algorithm: 'SHA1',
      digits: 6,
      period,
    });
    const delta = totp.validate({ token, window });
    return delta !== null;
  }

  generateAuthURL(account: string, period: ms.StringValue = '30s'): string {
    const { TOTP_ISSUER: issuer = '' } = process.env;
    const totp = new TOTP({
      issuer,
      label: account,
      secret: this.generateSecret(),
      algorithm: 'SHA1',
      digits: 6,
      period: ms(period) / 1000,
    });
    return totp.toString();
  }
}

const instance = new OTPUtil();

export { instance as OTPUtil };
