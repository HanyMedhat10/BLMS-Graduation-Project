import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { MaterialType } from './enum/material.enum';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  path: string;
  @Column({ type: 'enum', enum: MaterialType })
  materialType: MaterialType;
  @CreateDateColumn()
  createdAt: Timestamp;
  @ManyToOne(() => Course, (course) => course.materials)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  @ManyToOne(() => User, (user) => user.uploadMaterials)
  @JoinColumn({ name: 'uploadBy' })
  createBy: User;
}
