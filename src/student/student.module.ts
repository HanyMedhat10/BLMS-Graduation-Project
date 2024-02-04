import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User]), AuthModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
