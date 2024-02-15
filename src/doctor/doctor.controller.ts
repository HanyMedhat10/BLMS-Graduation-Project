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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Doctor Module')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createDoctorDto: CreateDoctorDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.doctorService.create(createDoctorDto, currentUser);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.doctorService.update(+id, updateDoctorDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
