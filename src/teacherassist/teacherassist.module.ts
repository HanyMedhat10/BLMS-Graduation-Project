import { Module } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { TeacherassistController } from './teacherassist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherAssistant, User]), AuthModule],
  controllers: [TeacherassistController],
  providers: [TeacherassistService],
})
export class TeacherassistModule {}
