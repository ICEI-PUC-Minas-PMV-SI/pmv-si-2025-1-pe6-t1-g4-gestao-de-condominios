import { SessionData } from './Server';

export type ResetPasswordPayload = {
  newPassword: string;
  session: SessionData;
};
