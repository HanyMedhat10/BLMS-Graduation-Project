import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherType } from './enum/teacher.enum';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class TeacherAssistant {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column()
  degreeProgram: string;
  @Column({ type: 'enum', enum: TeacherType })
  teacherType: TeacherType;
  @OneToOne(() => User, (user) => user.teacherAssistant)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Course, (course) => course.students, {
    cascade: true,
  })
  @JoinTable()
  courses: Course[];
}
