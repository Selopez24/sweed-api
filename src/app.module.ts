import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.guard';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { EmailModule } from './email/email.module';
import { SupabaseModule } from './supabase/supabase.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-east-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.mdttalbjettowwtmzfrx',
      password: 'QD4TfiLlQO378MSb',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    ImagesModule,
    EmailModule,
    SupabaseModule,
    FollowersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
