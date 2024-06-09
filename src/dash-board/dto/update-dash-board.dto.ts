import { PartialType } from '@nestjs/swagger';
import { CreateDashBoardDto } from './create-dash-board.dto';

export class UpdateDashBoardDto extends PartialType(CreateDashBoardDto) {}
