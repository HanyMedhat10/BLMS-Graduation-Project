import { College } from './entities/college.entity';
import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, User, Department])],
  controllers: [CollegeController],
  providers: [CollegeService],
  exports: [CollegeService],
})
export class CollegeModule {}
