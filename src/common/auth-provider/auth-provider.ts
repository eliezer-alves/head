export interface AuthProvider<T = any> {
  auth(): Promise<AuthResponse<T>>
}

export enum AuthStatus {
  ok = 200,
  badRequest = 400,
}

export type AuthResponse<T = any> = {
  status: AuthStatus
  body?: T
}
