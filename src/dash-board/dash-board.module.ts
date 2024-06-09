import { Module } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { DashBoardController } from './dash-board.controller';

@Module({
  controllers: [DashBoardController],
  providers: [DashBoardService],
})
export class DashBoardModule {}
