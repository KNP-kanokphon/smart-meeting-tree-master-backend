import Common from '../errors/common.error';
import Platform from '../errors/platform.error';
import Debt from '../errors/debt.error';
import Setting from '../errors/setting.error';

enum SystemErrorCode {
  NONE = 0,
  /** An unknown error occured while processing the request. */
  UNKNOWN = -1000,
  /** Internal error; unable to process your request. Please try again. */
  DISCONNECTED = -1001,
  /** You are not authorized to execute this request, no required permission. */
  UNAUTHORIZED = -1002,
  /** Must return 429 Http status */
  TOO_MANY_REQUESTS = -1003,
  /** This service is no longer available. */
  SERVICE_SHUTTING_DOWN = -1004,
  /** This operation is not supported. */
  UNSUPPORTED_OPERATION = -1005,
  /** This ip is banned for a period of time. */
  BAD_INPUT_PARAMETER = -1006,
  /** Timestamp for this request was 1000ms ahead of the server's time. */
  INVALID_TIMESTAMP = -1007,
  /** Timestamp for this request is outside of the recvWindow. */
  RECV_WINDOW_EXPIRED = -1008,
  /** API-KEY for this request is not valid. */
  INVALID_API_KEY = -1009,
  /** missing api-key, timestamp or signature */
  INCOMPLETE_API_IDENTIFICATION = -1010,
  /** Signature for this request is not valid. */
  INVALID_SIGNATURE = -1011,
  /** invalid jwt, wrong encryption or not found jwt, expired, password change, or logged out. */
  JWT_INVALID_OR_EXPIRED = -1012,
  /** This ip is banned for a period of time. Must return http status 418 */
  IP_IS_BANNED = -1013,

  IP_NOT_IN_WHITE_LIST = -1014,

  USER_NOT_FOUND = -1015,
  INCORRECT_PASSWORD = -1016,
  PASSWORD_HAS_WRONG_FORMAT = -1017,
  USER_IS_LOCKED = -1018,
  USER_IS_SUSPENDED = -1019,
  OLD_INVALID_ERROR = -1020,
}

// Map SystemErrorCode to http status code.
export enum HttpStatusMapping {
  UNAUTHORIZED = 401,
  TOO_MANY_REQUESTS = 429,
  IP_IS_BANNED = 418,
}

export type ErrorOptions = {
  msg?: string;
  params?: Record<string, any>;
};

class SystemError<TypeOfEnum> extends Error {
  public msg: string;

  public params: Record<string, any>;

  constructor(
    public abbr: keyof typeof SystemErrorCode | keyof TypeOfEnum = 'UNKNOWN',
    option?: ErrorOptions,
  ) {
    super(abbr.toString());
    this.msg = option?.msg ?? this.abbr.toString();
    this.params = option?.params ?? {};
  }
}

export const AppErrorCode = {
  ...Common,
  ...Platform,
  ...SystemErrorCode,
  ...Debt,
  ...Setting,
};

export class AppError extends SystemError<typeof AppErrorCode> {}

export * from './app-error.filter';
