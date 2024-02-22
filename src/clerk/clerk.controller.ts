import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { CreateClerkDto } from './dto/create-clerk.dto';
import { UpdateClerkDto } from './dto/update-clerk.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('clerk')
export class ClerkController {
  constructor(private readonly clerkService: ClerkService) {}

  @Post()
  create(
    @Body() createClerkDto: CreateClerkDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.clerkService.create(createClerkDto, currentUser);
  }

  @Get()
  findAll() {
    return this.clerkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clerkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClerkDto: UpdateClerkDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.clerkService.update(+id, updateClerkDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clerkService.remove(+id);
  }
}
