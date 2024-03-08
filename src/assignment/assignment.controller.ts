import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Assignment Module')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @UploadedFile() file: File,
  ) {
    return this.assignmentService.create(createAssignmentDto, file);
  }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
    @UploadedFile() file?: File,
  ) {
    return this.assignmentService.update(+id, updateAssignmentDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
