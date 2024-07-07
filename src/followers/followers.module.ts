import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { FolloweesController } from './followees.controller';

@Module({
  providers: [FollowersService],
  controllers: [FollowersController, FolloweesController],
  imports: [TypeOrmModule.forFeature([Follower])],
})
export class FollowersModule {}
