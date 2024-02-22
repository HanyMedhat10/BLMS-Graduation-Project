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
import { ClerkService } from './clerk.service';
import { CreateClerkDto } from './dto/create-clerk.dto';
import { UpdateClerkDto } from './dto/update-clerk.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
@ApiTags('Clerk')
@Controller('clerk')
export class ClerkController {
  constructor(private readonly clerkService: ClerkService) {}
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createClerkDto: CreateClerkDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.clerkService.create(createClerkDto, currentUser);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.clerkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clerkService.findOne(+id);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClerkDto: UpdateClerkDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.clerkService.update(+id, updateClerkDto, currentUser);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clerkService.remove(+id);
  }
}
