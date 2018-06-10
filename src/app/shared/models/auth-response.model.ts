export interface AuthResponse
{
  statusCode: AuthResponseCode,
  message: string,
}

export enum AuthResponseCode {
  Success = 4000,
  InvalidCredentials = 4010,
  TemporarilyBanned = 4020,
  Banned = 4021
}
