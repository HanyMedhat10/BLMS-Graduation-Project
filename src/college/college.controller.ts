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
import { CollegeService } from './college.service';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { CreateCollegeDto } from './dto/create-college.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
@ApiTags('College Module')
@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegeService.create(createCollegeDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.collegeService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collegeService.findOne(+id);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollegeDto: UpdateCollegeDto) {
    return this.collegeService.update(+id, updateCollegeDto);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collegeService.remove(+id);
  }
}
