import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './enum/user.enum';
import { Student } from 'src/student/entities/student.entity';
import { College } from '../../college/entities/college.entity';
import { Department } from 'src/department/entities/department.entity';
import { TeacherAssistant } from 'src/teacherassist/entities/teacherassist.entity';
import { Course } from 'src/course/entities/course.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { SubmitAssignment } from 'src/assignment/entities/submit_assignment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @ManyToOne(() => User)
  @JoinColumn()
  addedBy: User;
  //   @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  @Column({ type: 'enum', enum: Role })
  role: Role;
  @OneToOne(() => College, (college) => college.DeanOfCollege)
  dean: College;
  @ManyToOne(() => College, (college) => college.hasUser, {
    cascade: true,
  })
  @JoinTable()
  college: College;
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
  @OneToOne(() => Student, (student) => student.user, { cascade: true })
  student: Student;
  @OneToOne(() => TeacherAssistant, (ta) => ta.user, {
    cascade: true,
  })
  teacherAssistant: TeacherAssistant;
  @ManyToOne(() => Department, (department) => department.staff)
  @JoinColumn()
  department: Department;
  @OneToOne(() => Department, (department) => department.headOfDepartment, {
    cascade: true,
  })
  headOfDepartment: Department;
  @ManyToMany(() => Course, (course) => course.teaching, {
    cascade: true,
    // eager: true,
  })
  @JoinTable({ name: 'teaching_course' })
  teachingCourses: Course[];
  @OneToMany(() => Assignment, (user) => user.createBy)
  createAssignments: Assignment[];
  @OneToMany(() => SubmitAssignment, (user) => user.correctBy)
  correctAssignments: SubmitAssignment[];
}
