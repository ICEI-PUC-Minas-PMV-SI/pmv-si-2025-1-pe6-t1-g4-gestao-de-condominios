import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

export type Request = ExpressRequest;

export type Response = ExpressResponse;

export type RequestPayload = Record<string, any>;
