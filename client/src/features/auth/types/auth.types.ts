export interface IUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  backupEmail?: string;
  avatar?: string;
  role?: string;
  organizationId?: any;
  isVerified?: boolean;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
}

export interface ILoginRequest {
  email: string;
  password?: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password?: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken?: string;
  token?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ISendOtpRequest {
  email: string;
  type?: 'register' | 'reset-password' | 'login';
}

export interface IRegisterWithOtpRequest {
  name: string;
  email: string;
  password?: string;
  otp: string;
  organizationName?: string;
}

export interface IGoogleLoginRequest {
  credential?: string;
  idToken?: string;
}
