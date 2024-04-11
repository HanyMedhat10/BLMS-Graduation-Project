import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  // @OneToOne(() => User, (user) => user.teacherAssistant)
  // @JoinColumn()
  // user: User;
  // @ManyToMany(() => Course, (course) => course.students, {
  //   cascade: true,
  // })
  // @JoinTable({ name: 'teacher_assistant_courses' })
  // courses: Course[];
}
