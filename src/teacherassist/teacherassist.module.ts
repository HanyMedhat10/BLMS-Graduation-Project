import { Module } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { TeacherassistController } from './teacherassist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherAssistant])],
  controllers: [TeacherassistController],
  providers: [TeacherassistService],
})
export class TeacherassistModule {}
