export enum UserRole {
  admin = '1',
  user = '2',
  unresolve = '3'
}

export interface User {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
  email: string;
}
