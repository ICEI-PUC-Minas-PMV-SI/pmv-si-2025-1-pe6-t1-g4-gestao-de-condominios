import jwt, { JwtPayload } from 'jsonwebtoken';
import { StringValue } from 'ms';
type JwtVerifyResponse = {
  valid: boolean;
  data?: JwtPayload | string;
  message?: string;
};

class JWT {
  getSecretKey(): string {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error('EMPTY_JWT_SECRET_KEY');
    }
    return secret;
  }

  sign(payload: Record<string, any>, expiresIn: StringValue = '1d') {
    return jwt.sign(payload, this.getSecretKey(), { expiresIn });
  }

  verify(token: string): JwtVerifyResponse {
    try {
      return {
        valid: true,
        data: this.getData(token),
      };
    } catch (error: any) {
      return {
        valid: false,
        message: error.message,
      };
    }
  }

  getData(token: string) {
    return jwt.verify(token, this.getSecretKey());
  }
}

const instance = new JWT();

export { instance as JWT };
