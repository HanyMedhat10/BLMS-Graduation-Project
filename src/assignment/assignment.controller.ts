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
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@ApiTags('Assignment Module')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: 'pdf', // Specify PDF format
        },
        title: { type: 'string' },
        deadLine: { type: 'date', format: 'Date' },
        courseId: { type: 'number' },
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
    @Body('title') title: string,
    @Body('deadLine') deadLine: string,
    @Body('courseId') courseId: string,
  ) {
    console.log(file);
    // console.log(req.body.title);
    let createAssignmentDto = new CreateAssignmentDto();
    createAssignmentDto = {
      title: title,
      deadLine: new Date(deadLine),
      courseId: Number(courseId),
    };
    console.log(createAssignmentDto);
    return this.assignmentService.create(createAssignmentDto, file);
  }
  // @Post('SubmitAssignment')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'File', // Use 'File' for file uploads
  //         format: 'pdf', // Specify PDF format
  //       },
  //       assignmentId: { type: 'number' },
  //     },
  //   },
  // })
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //     // fileFilter: (req, file, callback) => {
  //     //   const allowedMimeTypes = [
  //     //     'application/pdf',
  //     //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Corrected DOCX MIME type
  //     //   ];
  //     //   if (allowedMimeTypes.includes(file.mimetype)) {
  //     //     callback(null, true);
  //     //   } else {
  //     //     callback(new Error('Invalid file type'), false);
  //     //   }
  //     // },
  //   }),
  // )
  // // handleMultiPartData(@Body() createAssignmentDto: CreateAssignmentDto)
  // createSubmitAssignment(
  //   // @Body() createAssignmentDto: CreateAssignmentDto,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 10000000 }), // 10000000*bytes
  //         new FileTypeValidator({
  //           fileType: 'application/pdf',
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Body('assignmentId') assignmentId: string,
  //   @CurrentUser() currentUser: User,
  // ) {
  //   console.log(file);
  //   return this.assignmentService.createSubmitAssignment(
  //     +assignmentId,
  //     file,
  //     currentUser,
  //   );
  //   // // console.log(req.body.title);
  //   // let createAssignmentDto = new CreateAssignmentDto();
  //   // createAssignmentDto = {
  //   //   title: title,
  //   //   deadLine: new Date(deadLine),
  //   //   courseId: Number(courseId),
  //   // };
  //   // console.log(createAssignmentDto);
  //   // return this.assignmentService.create(createAssignmentDto, file);
  // }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @Patch(':id')
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
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.assignmentService.update(+id, updateAssignmentDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
