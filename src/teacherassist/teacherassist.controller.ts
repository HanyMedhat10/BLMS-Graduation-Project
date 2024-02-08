import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { CreateTeacherassistDto } from './dto/create-teacherassist.dto';
import { UpdateTeacherassistDto } from './dto/update-teacherassist.dto';

@Controller('teacherassist')
export class TeacherassistController {
  constructor(private readonly teacherassistService: TeacherassistService) {}

  @Post()
  create(@Body() createTeacherassistDto: CreateTeacherassistDto) {
    return this.teacherassistService.create(createTeacherassistDto);
  }

  @Get()
  findAll() {
    return this.teacherassistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherassistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherassistDto: UpdateTeacherassistDto) {
    return this.teacherassistService.update(+id, updateTeacherassistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherassistService.remove(+id);
  }
}
