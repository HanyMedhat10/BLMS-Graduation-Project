export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TA = 'teacher assist',
  DR = 'dr',
  HOfDE = 'head Of Department',
}
type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: TimeRanges;
  updatedAt: TimeRanges;
  iat: number;
};

export interface IAuthenticate {
  token: string;
  user: User;
}
