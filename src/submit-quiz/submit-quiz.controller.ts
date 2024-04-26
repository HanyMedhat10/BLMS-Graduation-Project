import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { CreateSubmitQuizDto } from './dto/create-submit-quiz.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/entities/enum/user.enum';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
@ApiTags('submit-quiz')
@Controller('submit-quiz')
export class SubmitQuizController {
  constructor(private readonly submitQuizService: SubmitQuizService) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createSubmitQuizDto: CreateSubmitQuizDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.submitQuizService.create(createSubmitQuizDto, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.submitQuizService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitQuizService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('correctionAutomaticSubmitQuiz/:id')
  correctionAutomaticSubmitQuiz(@Param('id') id: string) {
    return this.submitQuizService.correctionAutomaticSubmitQuiz(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('correctionQuestion/:id')
  correctionQuestion(
    @Param('id') id: string,
    @Query('degree') degree: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.submitQuizService.correctionQuestion(+id, +degree, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitQuizService.remove(+id);
  }
}
