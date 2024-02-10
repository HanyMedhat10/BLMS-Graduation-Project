import { User } from 'src/auth/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  @JoinTable()
  teaching: User[];
}
