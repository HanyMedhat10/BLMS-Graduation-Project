import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubmitAssignmentService } from './submit-assignment.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
@ApiTags('Submit Assignment Module')
@Controller('submit-assignment')
export class SubmitAssignmentController {
  constructor(
    private readonly submitAssignmentService: SubmitAssignmentService,
  ) {}

  @ApiBearerAuth()
  @Roles('admin', 'student', 'teacher assist')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: 'pdf', // Specify PDF format
        },
        assignmentId: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      // fileFilter: (req, file, callback) => {
      //   const allowedMimeTypes = [
      //     'application/pdf',
      //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Corrected DOCX MIME type
      //   ];
      //   if (allowedMimeTypes.includes(file.mimetype)) {
      //     callback(null, true);
      //   } else {
      //     callback(new Error('Invalid file type'), false);
      //   }
      // },
    }),
  )
  // handleMultiPartData(@Body() createAssignmentDto: CreateAssignmentDto)
  create(
    // @Body() createAssignmentDto: CreateAssignmentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }), // 10000000*bytes
          new FileTypeValidator({
            fileType: 'application/pdf',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    // @Req() req,
    @Body('assignmentId') assignmentId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.submitAssignmentService.create(
      +assignmentId,
      file,
      currentUser,
    );
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.submitAssignmentService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitAssignmentService.findOne(+id);
  }
  @ApiBearerAuth()
  @Roles('admin', 'dr', 'teacher assist', 'head Of Department')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('correctionAssignment/:id')
  update(
    @Param('id') id: string,
    @Query('degree') degree: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.submitAssignmentService.correctionAssignment(
      +id,
      +degree,
      currentUser,
    );
  }
  @ApiBearerAuth()
  @Roles('admin', 'dr', 'teacher assist', 'head Of Department')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitAssignmentService.remove(+id);
  }
}
