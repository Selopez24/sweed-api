import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createPostDTO from './dto/createPost.dto';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  create(createPostDTO: createPostDTO, userId: string): Promise<Post> {
    return this.postsRepository.save({
      ...createPostDTO,
      userId,
    });
  }

  findByUserId(userId: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId },
      relations: { images: true, user: true },
    });
  }
}
