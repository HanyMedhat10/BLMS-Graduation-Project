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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'BLMS_GP',
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
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
