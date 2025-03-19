import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ProfilePermission } from './Authorization';

export type SessionData = {
  id: string;
  name: string;
  profile: ProfilePermission;
  iat: number;
  exp: number;
};

export type Request = ExpressRequest & {
  session?: SessionData;
};

export type Response = ExpressResponse;

export type RequestPayload = Record<string, any>;

export type PublicRoute = {
  route: string | RegExp;
  method?: ('POST' | 'PUT' | 'GET' | 'DELETE')[];
};
