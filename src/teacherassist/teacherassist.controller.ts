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
import { TeacherassistService } from './teacherassist.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTeacherAssistUserDto } from './dto/create-teacherassist-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UpdateTeacherAssistUserDto } from './dto/update-teacherassist-user.dto';

@Controller('teacherassist')
export class TeacherassistController {
  constructor(private readonly teacherassistService: TeacherassistService) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createTeacherassistDto: CreateTeacherAssistUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.teacherassistService.create(
      createTeacherassistDto,
      currentUser,
    );
  }

  @Get()
  findAll() {
    return this.teacherassistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherassistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherassistDto: UpdateTeacherAssistUserDto,
  ) {
    return this.teacherassistService.update(+id, updateTeacherassistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherassistService.remove(+id);
  }
}
