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
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Head Of Department Module')
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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return await this.headOfDepartmentService.findAll();
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.headOfDepartmentService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.headOfDepartmentService.update(
      +id,
      updateHeadOfDepartmentDto,
      currentUser,
    );
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.headOfDepartmentService.remove(+id);
  }
}
