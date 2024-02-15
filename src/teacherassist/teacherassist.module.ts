import { Module } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { TeacherassistController } from './teacherassist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherAssistant, User]),
    AuthModule,
    CourseModule,
    DepartmentModule,
  ],
  controllers: [TeacherassistController],
  providers: [TeacherassistService],
  exports: [TeacherassistService],
})
export class TeacherassistModule {}
