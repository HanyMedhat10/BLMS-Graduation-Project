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
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/entities/enum/user.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsType } from './entities/enum/questions-type.enum';
@ApiTags('Quiz Module')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createQuizDto: CreateQuizDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.quizService.createQuiz(createQuizDto, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiQuery({ name: 'questionsType', enum: QuestionsType })
  @Post('question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.quizService.createQuestion(createQuestionDto);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.quizService.findAllQuiz();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('questions')
  findAllQuestion() {
    return this.quizService.findAllQuestion();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOneQuiz(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('averageScoresOfOneQuiz/:id')
  averageScoresOfOneQuiz(@Param('id') id: string) {
    return this.quizService.averageScoresOfOneQuiz(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('numberOfSubmittedQuizzes/:id')
  numberOfSubmittedQuizzes(@Param('id') id: string) {
    return this.quizService.numberOfSubmittedQuizzes(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfPassedQuizzes/:id')
  percentageOfPassedQuizzes(@Param('id') id: string) {
    return this.quizService.percentageOfPassedQuizzes(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfSubmittedQuizzes/:id')
  percentageOfSubmittedQuizzes(@Param('id') id: string) {
    return this.quizService.percentageOfSubmittedQuizzes(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findSubmitQuiz/:id')
  findSubmitQuiz(@Param('id') id: string) {
    return this.quizService.findSubmitQuiz(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('questions/:id')
  findOneQuestion(@Param('id') id: string) {
    return this.quizService.findOneQuestion(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findSubmitQuestions/:id')
  findSubmitQuestions(@Param('id') id: string) {
    return this.quizService.findSubmitQuestions(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('percentageOfGetterFullScoresQuestion/:id')
  percentageOfGetterFullScoresQuestion(@Param('id') id: string) {
    return this.quizService.percentageOfFullScoresQuestions(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz(+id, updateQuizDto);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('question/:id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuestionDto) {
    return this.quizService.updateQuestion(+id, updateQuizDto);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  removeQuiz(@Param('id') id: string) {
    return this.quizService.removeQuiz(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('question/:id')
  removeQuestion(@Param('id') id: string) {
    return this.quizService.removeQuestion(+id);
  }
}
