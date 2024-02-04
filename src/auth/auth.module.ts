import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
