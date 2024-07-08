import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { MaterialType } from './entities/enum/material.enum';
import { Role } from 'src/auth/entities/enum/user.enum';
@ApiTags('Material Module')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadDocs/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: '(pdf|docx)', // Specify PDF or word format
        },
        title: { type: 'string' },
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
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Corrected DOCX MIME type
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  uploadDocs(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }), // 10000000*bytes
          new FileTypeValidator({
            // Corrected assignment for fileType
            fileType:
              'application/pdf|application/vnd.openxmlformats-officedocument.wordprocessingml.document', // PDF and word formats, // PDF and word formats
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('title') title: string,
    @Body('courseId') courseId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.materialService.uploadFile(file, title, +courseId, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadBook/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: '(pdf|docx)', // Specify PDF or word format
        },
        title: { type: 'string' },
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
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Corrected DOCX MIME type
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  uploadBook(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }), // 10000000*bytes
          new FileTypeValidator({
            // Corrected assignment for fileType
            fileType:
              'application/pdf|application/vnd.openxmlformats-officedocument.wordprocessingml.document', // PDF and word formats, // PDF and word formats
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('title') title: string,
    @Body('courseId') courseId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.materialService.uploadBook(file, title, +courseId, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadVideo/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: '(mp4|webm)', // Specify video format
        },
        title: { type: 'string' },
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
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['video/mp4', 'video/webm'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50000000 }), // 50000000*bytes
          new FileTypeValidator({
            // Corrected assignment for fileType
            fileType: 'video/mp4|video/webm', // MP4 and webm formats, // MP4 and webm formats
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('title') title: string,
    @Body('courseId') courseId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.materialService.uploadFile(
      file,
      title,
      +courseId,
      currentUser,
      MaterialType.Video,
    );
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addLink/')
  addLink(
    @Body() createMaterialDto: CreateMaterialDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.materialService.addLink(createMaterialDto, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query('type') type?: string) {
    /* Req() req 
    const type = req.query.type;
    */
    return this.materialService.findAll(type);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.DR, Role.TA, Role.HOfDE, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
