import { Get, Body, Controller, Request, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import createPostDTO from './dto/createPost.dto';
import { Post as PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body() createPostDTO: createPostDTO, @Request() req: any) {
    return this.postsService.create(createPostDTO, req.user.id);
  }

  @Get('user/:id')
  getByUser(@Param() params: any): Promise<PostEntity[]> {
    return this.postsService.findByUserId(params.id);
  }
}
