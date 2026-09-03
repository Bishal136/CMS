export interface ITokenPayload {
  userId: string;
  email: string;
  role: string;
  organizationId: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    organizationId: string;
  };
  tokens: IAuthTokens;
}
