import { Get, Body, Controller, Request, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import createPostDTO from './dto/createPost.dto';
import { getPostDto } from './dto/getPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('user/:id')
  async getByUser(@Param() params: any): Promise<getPostDto[]> {
    const posts = await this.postsService.findByUserId(params.id);

    const response = posts.map(({ user, ...post }) => ({
      ...post,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    }));
    return response;
  }

  @Post()
  create(@Body() createPostDTO: createPostDTO, @Request() req: any) {
    return this.postsService.create(createPostDTO, req.user.id);
  }
}
