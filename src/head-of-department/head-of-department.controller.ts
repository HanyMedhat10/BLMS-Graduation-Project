import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorService } from 'src/doctor/doctor.service';
import { Role } from 'src/auth/entities/enum/user.enum';
@ApiTags('Head Of Department Module')
@Controller('head-of-department')
export class HeadOfDepartmentController {
  constructor(
    private readonly headOfDepartmentService: HeadOfDepartmentService,
    private readonly doctorService: DoctorService,
  ) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
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
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addTeachingCourse/:id')
  addTeachingCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ): Promise<User> {
    return this.doctorService.addTeachingCourse(+id, +courseId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return await this.headOfDepartmentService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.headOfDepartmentService.findOne(+id);
  }
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.headOfDepartmentService.remove(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteTeachingCourse/:id')
  removeTeachingCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ) {
    return this.doctorService.removeCourse(+id, +courseId);
  }
}
