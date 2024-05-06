import { Assignment } from 'src/assignment/entities/assignment.entity';
import { User } from 'src/auth/entities/user.entity';

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
  @ManyToOne(() => User, (student) => student.submitsAssignments, {
    cascade: true,
  })
  @JoinColumn()
  solver: User;
  @ManyToOne(() => User, (staff) => staff.correctAssignments, { cascade: true })
  @JoinColumn()
  correctBy: User;
  @ManyToOne(() => Assignment, (assignment) => assignment.submits)
  @JoinColumn()
  assignment: Assignment;
}
