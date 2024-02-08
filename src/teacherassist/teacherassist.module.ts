import { Module } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { TeacherassistController } from './teacherassist.controller';

@Module({
  controllers: [TeacherassistController],
  providers: [TeacherassistService],
})
export class TeacherassistModule {}
