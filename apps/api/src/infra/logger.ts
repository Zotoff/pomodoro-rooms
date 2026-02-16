export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export function log(level: LogLevel, message: string, meta: Record<string, any> = {}) {
  const record = {
    ts: new Date().toISOString(),
    level,
    msg: message,
    ...meta,
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(record));
}
