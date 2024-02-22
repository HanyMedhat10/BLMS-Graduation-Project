import { Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { ClerkController } from './clerk.controller';
import { User } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [ClerkController],
  providers: [ClerkService],
})
export class ClerkModule {}
