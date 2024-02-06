import { College } from './entities/college.entity';
import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, User])],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
