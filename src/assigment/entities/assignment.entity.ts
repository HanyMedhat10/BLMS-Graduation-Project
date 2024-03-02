import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
  @ManyToMany(() => Student, (student) => student.submits, { cascade: true })
  @JoinTable({
    name: 'submit_assignment',
    joinColumns: [{ name: 'url' }, { name: 'degree' }],
  })
  solves: Student[];
  @ManyToOne(() => Course, (course) => course.assignments, { cascade: true })
  @JoinColumn()
  course: Course;
  @ManyToOne(() => User, (user) => user.createAssignments, { cascade: true })
  @JoinColumn()
  createBy: User;
  // @ManyToOne(() => User, (user) => user.correctAssignments, { cascade: true })
  // @JoinColumn()
  // correctBy: User;
}
