import bcrypt from 'bcrypt';

class PasswordHelper {
  async encrypt(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  async isValid(
    plainText: string,
    encryptedPassword: string
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(plainText, encryptedPassword);
    return isValid;
  }
}

const instance = new PasswordHelper();

export { instance as PasswordHelper };
