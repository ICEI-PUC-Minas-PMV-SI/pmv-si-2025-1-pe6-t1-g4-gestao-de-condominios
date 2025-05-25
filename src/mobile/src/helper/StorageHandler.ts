import { UserInfo } from '@/types/Data';
import Storage from '@/utilities/Storage';

class StorageHandler {
  handleString(value: string) {
    return value.replace(new RegExp(String.fromCharCode(0), 'g'), '');
  }

  async getUserId(): Promise<string> {
    const userInfo = await this.getUserInfo();
    return userInfo ? userInfo.id : '';
  }

  async getUserName(): Promise<string | null> {
    const userInfo = await this.getUserInfo();
    return userInfo ? userInfo.name : null;
  }

  async setUserInfo(user: string | UserInfo) {
    if (typeof user === 'string') {
      await Storage.set('user-info', this.handleString(user));
    } else {
      await Storage.set('user-info', JSON.stringify(user));
    }
  }

  async getUserInfo(): Promise<UserInfo | null> {
    try {
      const user = await Storage.getString('user-info');
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAuthToken(): Promise<string | null> {
    return await Storage.getString('auth-token');
  }

  async setAuthToken(authToken: string) {
    await Storage.set('auth-token', this.handleString(authToken));
  }

  async getServerUrl(): Promise<string | null> {
    return await Storage.getString('server-url');
  }

  async setServerUrl(url: string) {
    await Storage.set('server-url', this.handleString(url));
  }

  async clear() {
    await Storage.clearAll();
  }
}

export default new StorageHandler();
