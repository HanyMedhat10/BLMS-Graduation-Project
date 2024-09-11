import { Course } from 'src/course/entities/course.entity';
import { Department } from 'src/department/entities/department.entity';

export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TA = 'teacher assist',
  DR = 'dr',
  HOfDE = 'head Of Department',
  CLERK = 'clerk',
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
export interface Staff {
  department: Department;
  teachingCourses: Course[];
}
export interface IAuthenticate {
  token: string;
  user: User;
}
