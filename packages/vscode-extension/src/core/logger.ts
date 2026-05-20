const PREFIX = '[MongoModeler]';

export const logInfo = (message: string, ...rest: unknown[]): void => {
  console.info(`${PREFIX} ${message}`, ...rest);
};

export const logError = (message: string, ...rest: unknown[]): void => {
  console.error(`${PREFIX} ${message}`, ...rest);
};
