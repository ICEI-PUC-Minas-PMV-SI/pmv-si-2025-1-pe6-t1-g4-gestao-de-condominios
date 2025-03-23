import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ProfilePermission } from './Authorization';

export type SessionData = {
  id: string;
  name: string;
  email: string;
  profile: ProfilePermission;
  iat: number;
  exp: number;
  operation?: 'RESET_PASSWORD';
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

export type ValidationError = {
  field: string;
  message: string;
};

export type ResponseData = {
  message?: string;
  error?: string;
  errors?: ValidationError[];
} & Record<string, any>;
