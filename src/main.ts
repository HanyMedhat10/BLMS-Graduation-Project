import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import path from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('BLMS example')
    .setTitle('The BLMS API description')
    .setDescription('Develope By.Hany Medhat Gamal Mehani')
    .setContact(
      'Hany Medhat Gamal Mehani ',
      'https://www.linkedin.com/in/hany-medhat-74452520a/',
      'hany.medhat24@gmail.com',
    )
    // .addSecurity()
    .addBearerAuth()
    .setLicense(
      'License : MTI University , Supervisor :- Prof.Hesham El-Deeb',
      'https://www.mti.edu.eg/',
    )
    .setVersion('1.0')
    .addTag('BLMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useStaticAssets(
  //   path.join(
  //     'C:/Users/hanym/Desktop/Node-code/Nestjs Projects/blms',
  //     '../files',
  //   ),
  // );
  app.enableCors();
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
