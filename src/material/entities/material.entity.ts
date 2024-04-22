import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  path: string;
  @CreateDateColumn()
  createdAt: Date;
    @ManyToOne(() => Course, (course) => course.materials)
    @JoinColumn({ name: 'courseId' })
    course: Course;
}
