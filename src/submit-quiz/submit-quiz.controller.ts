import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { CreateSubmitQuizDto } from './dto/create-submit-quiz.dto';
import { UpdateSubmitQuizDto } from './dto/update-submit-quiz.dto';

@Controller('submit-quiz')
export class SubmitQuizController {
  constructor(private readonly submitQuizService: SubmitQuizService) {}

  @Post()
  create(@Body() createSubmitQuizDto: CreateSubmitQuizDto) {
    return this.submitQuizService.create(createSubmitQuizDto);
  }

  @Get()
  findAll() {
    return this.submitQuizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitQuizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmitQuizDto: UpdateSubmitQuizDto) {
    return this.submitQuizService.update(+id, updateSubmitQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitQuizService.remove(+id);
  }
}
