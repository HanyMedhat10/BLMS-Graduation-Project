import { User } from 'src/auth/entities/user.entity';
import { College } from 'src/college/entities/college.entity';
import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => College, (college) => college.departments)
  @JoinColumn()
  college: College;
  //? Tomorrow
  @OneToMany(() => User, (user) => user.department)
  staff: User[];
  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];
}
