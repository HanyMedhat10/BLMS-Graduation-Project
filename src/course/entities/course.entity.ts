import { Assignment } from 'src/assigment/entities/assignment.entity';
import { User } from 'src/auth/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
  @ManyToOne(() => Department, (department) => department.courses)
  department: Department;
  @ManyToMany(() => User, (dr) => dr.teachingCourses)
  teaching: User[];
  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];
}
