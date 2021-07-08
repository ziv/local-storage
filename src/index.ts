import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export type AsyncContext = { request: Request; response: Response };
export type LocalStorage = AsyncLocalStorage<AsyncContext>;

let asyncLocalStorage: LocalStorage;

export function localStorage(storage?: LocalStorage): RequestHandler {
  asyncLocalStorage = storage || new AsyncLocalStorage<AsyncContext>();
  return (request: Request, response: Response, next: NextFunction): void =>
    asyncLocalStorage.run<void>({ request, response }, next);
}

export function getStore(): AsyncContext | undefined {
  return asyncLocalStorage ? asyncLocalStorage.getStore() : undefined;
}
