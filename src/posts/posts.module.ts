import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Post_Image } from './post_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Post_Image])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
