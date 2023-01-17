import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.guard';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sebastianl',
      password: 'tesla123',
      database: 'sebastianl',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
