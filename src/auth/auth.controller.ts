import { User } from './entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Roles } from './roles/roles.decorator';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { ChangePasswordDto } from './dto/change-password-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createAuthDto: CreateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.authService.create(createAuthDto, currentUser);
  }
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
  @Post('restPassword/:id')
  restPassword(@Param('id') id: string) {
    return this.authService.restPassword(+id);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('changePassword')
  changePassword(
    @CurrentUser() currentUser: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(currentUser, changePasswordDto);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('singleUser/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.authService.update(+id, updateAuthDto, currentUser);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
