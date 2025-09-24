import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateConfig } from './config/validate';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get("MONGODB_URI"),
        };
      },
    }),

    ThrottlerModule.forRoot({
      errorMessage: "Quá nhiều requests. Vui lòng thử lại sau.",
      throttlers: [
        {
          ttl: 60000, // milliseconds
          limit: 10, // max requests
        },
      ],
    }),

    UsersModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,

    // Apply throttling globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
