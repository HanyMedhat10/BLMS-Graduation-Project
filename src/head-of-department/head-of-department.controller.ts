import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('head-of-department')
export class HeadOfDepartmentController {
  constructor(
    private readonly headOfDepartmentService: HeadOfDepartmentService,
  ) {}

  @Post()
  create(
    @Body() createHeadOfDepartmentDto: CreateHeadOfDepartmentDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.headOfDepartmentService.create(
      createHeadOfDepartmentDto,
      currentUser,
    );
  }

  @Get()
  findAll() {
    return this.headOfDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headOfDepartmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto,
  ) {
    return this.headOfDepartmentService.update(+id, updateHeadOfDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headOfDepartmentService.remove(+id);
  }
}
