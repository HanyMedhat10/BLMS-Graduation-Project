import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { CreateDashBoardDto } from './dto/create-dash-board.dto';
import { UpdateDashBoardDto } from './dto/update-dash-board.dto';

@Controller('dash-board')
export class DashBoardController {
  constructor(private readonly dashBoardService: DashBoardService) {}

  @Post()
  create(@Body() createDashBoardDto: CreateDashBoardDto) {
    return this.dashBoardService.create(createDashBoardDto);
  }

  @Get()
  findAll() {
    return this.dashBoardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashBoardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashBoardDto: UpdateDashBoardDto) {
    return this.dashBoardService.update(+id, updateDashBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashBoardService.remove(+id);
  }
}
