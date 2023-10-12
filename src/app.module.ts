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
<<<<<<< HEAD
import { EmailModule } from './email/email.module';
=======
>>>>>>> fe230b3 (add basic image flow)
import { SupabaseModule } from './supabase/supabase.module';

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
<<<<<<< HEAD
    EmailModule,
=======
>>>>>>> fe230b3 (add basic image flow)
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
