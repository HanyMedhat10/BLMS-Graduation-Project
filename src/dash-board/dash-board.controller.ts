import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/auth/entities/enum/user.enum';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('dash-board')
export class DashBoardController {
  constructor(private readonly dashBoardService: DashBoardService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('averageScoresOfOneQuiz/:id')
  averageScoresOfOneQuiz(@Param('id') id: string) {
    return this.dashBoardService.averageScoresOfOneQuiz(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('numberOfSubmittedQuizzes/:id')
  numberOfSubmittedQuizzes(@Param('id') id: string) {
    return this.dashBoardService.numberOfSubmittedQuizzes(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfPassedQuizzes/:id')
  percentageOfPassedQuizzes(@Param('id') id: string) {
    return this.dashBoardService.percentageOfPassedQuizzes(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfSubmittedQuizzes/:id')
  percentageOfSubmittedQuizzes(@Param('id') id: string) {
    return this.dashBoardService.percentageOfSubmittedQuizzes(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findSubmitQuiz/:id')
  findSubmitQuiz(@Param('id') id: string) {
    return this.dashBoardService.findSubmitQuiz(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findSubmitQuestions/:id')
  findSubmitQuestions(@Param('id') id: string) {
    return this.dashBoardService.findSubmitQuestions(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfGetterFullScoresQuestion/:id')
  percentageOfGetterFullScoresQuestion(@Param('id') id: string) {
    return this.dashBoardService.percentageOfFullScoresQuestions(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('averageScoresOfOneAssignment/:id')
  averageScoresOfOneAssignment(@Param('id') id: string) {
    return this.dashBoardService.averageScoresOfOneAssignment(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('numberOfSubmitAssignment/:id')
  numberOfSubmitAssignment(@Param('id') id: string) {
    return this.dashBoardService.numberOfSubmitAssignment(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfSubmitAssignment/:id')
  percentageOfSubmitAssignment(@Param('id') id: string) {
    return this.dashBoardService.percentageOfSubmitAssignment(+id);
  }
}
