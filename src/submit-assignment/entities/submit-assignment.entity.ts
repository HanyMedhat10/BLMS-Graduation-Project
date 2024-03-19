import { Assignment } from 'src/assignment/entities/assignment.entity';
import { User } from 'src/auth/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
@Entity()
export class SubmitAssignment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column({ nullable: true })
  degree: number;
  @CreateDateColumn()
  submitTime: Timestamp;
  @ManyToOne(() => Student, (student) => student.submits, { cascade: true })
  @JoinColumn()
  solver: Student;
  @ManyToOne(() => User, (staff) => staff.correctAssignments, { cascade: true })
  @JoinColumn()
  correctBy: User;
  @ManyToOne(() => Assignment, (assignment) => assignment.submits, {
    cascade: true,
  })
  @JoinColumn()
  assignment: Assignment;
}
