import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentType } from './enum/student.enum';
import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { SubmitAssignment } from 'src/submit-assignment/entities/submit-assignment.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  classes: string;
  @Column({ nullable: true })
  degreeProgram: string;
  @Column({ type: 'enum', enum: StudentType })
  studentType: StudentType;
  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Course, (course) => course.students, {
    cascade: true,
  })
  @JoinTable({ name: 'student_courses' })
  courses: Course[];
  @OneToMany(() => SubmitAssignment, (assignment) => assignment.solver)
  submits: SubmitAssignment[];
}
