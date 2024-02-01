
export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TA = 'teacherAssent',
  DR = 'dr',
  HOfDE = 'headOfDepartment',
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
