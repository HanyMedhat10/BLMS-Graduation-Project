import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
@ApiTags('Department Module')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
