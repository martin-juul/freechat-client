export interface User
{
  id?: string;
  username?: string;
  password?: string;
  avatar?: string;
  email?: string;
  token?: AuthToken
}

export interface AuthToken
{
  token: string;
  createdAt: Date;
}
