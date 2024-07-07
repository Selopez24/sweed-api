import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Post_Image } from './post_image.entity';
import { ImagesService } from 'src/images/images.service';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Post_Image]), ImagesModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
