import { User } from './entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Roles } from './roles/roles.decorator';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { ChangePasswordDto } from './dto/change-password-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
// import * as path from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Role } from './entities/enum/user.enum';
import { extname } from 'path';
// import { createReadStream } from 'fs';
@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createAuthDto: CreateAdminDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.authService.create(createAuthDto, currentUser);
  }
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
  @Roles(Role.ADMIN, Role.CLERK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('restPassword/:id')
  restPassword(@Param('id') id: string) {
    return this.authService.restPassword(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('changePassword')
  changePassword(
    @CurrentUser() currentUser: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(currentUser, changePasswordDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }
  @ApiBearerAuth()
  @Get('singleUser/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  @ApiBearerAuth()
  @Get('getAnyUser/:id')
  anyUser(@Param('id') id: string) {
    return this.authService.anyUser(+id);
  }
  @ApiBearerAuth()
  @Get('allAnyUser/')
  allAnyUser() {
    return this.authService.allAnyUser();
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAdminDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.authService.update(+id, updateAuthDto, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  async profile(@CurrentUser() currentUser: User) {
    return await this.authService.profile(currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('ChangeProfileImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'File', // Use 'File' for file uploads
          format: '(jpeg|png)', // Specify Image format
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
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  changeProfileImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), // 5000000*bytes
          new FileTypeValidator({
            fileType: 'image/jpeg|image/png', // jpeg and png formats,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() currentUser: User,
  ) {
    // const fileNe = createReadStream(
    //   join(process.cwd(), '/files/' + file.filename),
    // );
    // return new StreamableFile(fileNe);
    // res.sendFile(path.join(process.cwd(), 'files/' + file.filename)); //show image in response
    return this.authService.changeProfileImage(file, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('profileImage')
  deleteProfileImage(@CurrentUser() currentUser: User) {
    return this.authService.deleteProfileImage(currentUser);
  }
}
