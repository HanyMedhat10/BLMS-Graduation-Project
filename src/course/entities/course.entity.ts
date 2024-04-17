import { Assignment } from 'src/assignment/entities/assignment.entity';
import { User } from 'src/auth/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
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
  @ManyToMany(() => User, (student) => student.courses)
  students: User[];
  @ManyToOne(() => Department, (department) => department.courses)
  department: Department;
  @ManyToMany(() => User, (dr) => dr.teachingCourses)
  teaching: User[];
  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];
}
