import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { StudentModule } from './student/student.module';
import { CollegeModule } from './college/college.module';
import { DepartmentModule } from './department/department.module';
import { CourseModule } from './course/course.module';
import { TeacherassistModule } from './teacherassist/teacherassist.module';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { HeadOfDepartmentModule } from './head-of-department/head-of-department.module';
import { ClerkModule } from './clerk/clerk.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true, // will the project production is false
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '7d' } }),
    StudentModule,
    CollegeModule,
    DepartmentModule,
    CourseModule,
    TeacherassistModule,
    DoctorModule,
    ConfigModule.forRoot(),
    HeadOfDepartmentModule,
    ClerkModule,
    AssignmentModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
