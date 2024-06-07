import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/entities/enum/user.enum';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { extname } from 'path';
@ApiTags('Course Module')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Roles(Role.ADMIN, Role.CLERK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addDegree/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          // format: '(csv|xlsx)', // Specify csv or xlsx format
          format: '(csv)', // Specify csv or xlsx format
        },
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
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'text/csv',
          'application/vnd.ms-excel', // Corrected MIME type for CSV and xlsx formats
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  addDegree(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }), // 10000000*bytes
          new FileTypeValidator({
            // Corrected assignment for fileType
            fileType:
              'text/csv|application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // CSV and xlsx formats, // CSV and xlsx formats
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.courseService.addDegrees(+id, file);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('participants/:id')
  findAllParticipants(@Param('id') id: string) {
    return this.courseService.findAllParticipants(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findNameParticipants/:id')
  findByNameUser(@Param('id') id: string, @Query('name') name: string) {
    return this.courseService.findByNameUser(+id, name);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('allStaff/:id')
  findStaff(@Param('id') id: string) {
    return this.courseService.findStaff(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('searchByRole/:id')
  searchByRole(@Param('id') id: string, @Query('name') name: string) {
    return this.courseService.searchByRole(+id, name);
  }
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
