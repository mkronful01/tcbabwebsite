export class Logger {
  public static info(methodName: string, message: string, details?: unknown): void {
    if (details !== undefined) {
      console.info(`[${methodName}] ${message}`, details);
      return;
    }
    console.info(`[${methodName}] ${message}`);
  }

  public static warn(methodName: string, message: string, details?: unknown): void {
    if (details !== undefined) {
      console.warn(`[${methodName}] ${message}`, details);
      return;
    }
    console.warn(`[${methodName}] ${message}`);
  }

  public static error(methodName: string, message: string, details?: unknown): void {
    if (details !== undefined) {
      console.error(`[${methodName}] ${message}`, details);
      return;
    }
    console.error(`[${methodName}] ${message}`);
  }

  public static debug(methodName: string, message: string, details?: unknown): void {
    if (details !== undefined) {
      console.debug(`[${methodName}] ${message}`, details);
      return;
    }
    console.debug(`[${methodName}] ${message}`);
  }
}
