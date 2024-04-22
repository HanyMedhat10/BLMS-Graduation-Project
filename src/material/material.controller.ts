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
@ApiTags('Material Module')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @ApiBearerAuth()
  @Roles('admin', 'dr', 'teacher assist', 'head Of Department')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadFile/')
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
  uploadFile(
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
  @Roles('admin', 'dr', 'teacher assist', 'head Of Department')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addLink/')
  addLink(
    @Body() createMaterialDto: CreateMaterialDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.materialService.addLink(createMaterialDto, currentUser);
  }
  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
