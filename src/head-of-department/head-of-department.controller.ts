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
import { HeadOfDepartmentService } from './head-of-department.service';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('head-of-department')
export class HeadOfDepartmentController {
  constructor(
    private readonly headOfDepartmentService: HeadOfDepartmentService,
  ) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(
    @Body() createHeadOfDepartmentDto: CreateHeadOfDepartmentDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.headOfDepartmentService.create(
      createHeadOfDepartmentDto,
      currentUser,
    );
  }

  @Get()
  async findAll() {
    return await this.headOfDepartmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.headOfDepartmentService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto,
  ) {
    return await this.headOfDepartmentService.update(
      +id,
      updateHeadOfDepartmentDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.headOfDepartmentService.remove(+id);
  }
}
