import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { SubmitAssignmentService } from './submit-assignment.service';
import { CreateSubmitAssignmentDto } from './dto/create-submit-assignment.dto';
import { UpdateSubmitAssignmentDto } from './dto/update-submit-assignment.dto';
import { ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('submit-assignment')
export class SubmitAssignmentController {
  constructor(
    private readonly submitAssignmentService: SubmitAssignmentService,
  ) {}

  @Post()
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

  @Get()
  findAll() {
    return this.submitAssignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmitAssignmentDto: UpdateSubmitAssignmentDto,
  ) {
    return this.submitAssignmentService.update(+id, updateSubmitAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitAssignmentService.remove(+id);
  }
}
function FileSizeValidator(arg0: {
  maxSize: number;
}): import('@nestjs/common').FileValidator<
  Record<string, any>,
  import('@nestjs/common/pipes/file/interfaces').IFile
> {
  throw new Error('Function not implemented.');
}
