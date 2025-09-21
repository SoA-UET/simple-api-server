import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter';

function configureGlobalFilters(app: INestApplication<any>) {
  app.useGlobalFilters(
    new MongoExceptionFilter(),
  );
}

function configureSwagger(app: INestApplication<any>) {
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Auto-generated API docs')
    .setVersion('1.0')
    .addBearerAuth() // optional, if you want JWT auth in docs
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: '/api-json',
  });
}

function configureClassSerializer(app: INestApplication<any>) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
}

function configureApp(app: INestApplication<any>) {
  configureClassSerializer(app);
  app.useGlobalPipes(new ValidationPipe());
  configureSwagger(app);
  configureGlobalFilters(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;

  console.log(`Starting server at http://${HOST}:${PORT}`);

  await app.listen(
    PORT,
    HOST,
  );
}
bootstrap();
