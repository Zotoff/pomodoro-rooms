import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const incoming = req.header('x-request-id');
  const requestId = incoming && incoming.length < 100 ? incoming : randomUUID();

  // чтобы можно было логировать везде
  (req as any).requestId = requestId;

  // чтобы прокидывалось клиенту и по цепочке сервисов
  res.setHeader('x-request-id', requestId);

  next();
}
