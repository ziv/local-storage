import { AsyncContext, getStore, localStorage } from '@/index';
import { Request, Response } from 'express';

describe('local-storage', () => {
  it('should return middleware', () => {
    const middleware = localStorage();
    expect(middleware).toBeInstanceOf(Function);
    expect(middleware).toHaveLength(3);
  });

  it('should run next function', done => {
    const request = {} as unknown as Request;
    const response = {} as unknown as Response;
    const next = () => {
      // assert function
      done();
    };
    localStorage()(request, response, next);
  });

  it('should provide storage in async context', done => {
    // abusing Request interface :)
    const request = { statusCode: 0 } as unknown as Request;
    const response = { statusCode: 0 } as unknown as Response;

    const change = async () => {
      const { request, response } = getStore() as AsyncContext;
      request.statusCode = (request.statusCode || 0) + 1;
      response.statusCode--;
    };

    const assert = async (counts: number) => {
      const { request, response } = getStore() as AsyncContext;
      expect(request.statusCode).toEqual(counts);
      expect(response.statusCode).toEqual(0 - counts);
    };

    localStorage()(request, response, async () => {
      await change();
      await assert(1);
      await change();
      await assert(2);
      done();
    });
  });
});
