import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubmitAssignmentService } from './submit-assignment.service';
import { CreateSubmitAssignmentDto } from './dto/create-submit-assignment.dto';
import { UpdateSubmitAssignmentDto } from './dto/update-submit-assignment.dto';

@Controller('submit-assignment')
export class SubmitAssignmentController {
  constructor(
    private readonly submitAssignmentService: SubmitAssignmentService,
  ) {}

  @Post()
  create(@Body() createSubmitAssignmentDto: CreateSubmitAssignmentDto) {
    return this.submitAssignmentService.create(createSubmitAssignmentDto);
  }

  @Get()
  findAll() {
    return this.submitAssignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmitAssignmentDto: UpdateSubmitAssignmentDto,
  ) {
    return this.submitAssignmentService.update(+id, updateSubmitAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitAssignmentService.remove(+id);
  }
}
