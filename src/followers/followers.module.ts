import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';

@Module({
  providers: [FollowersService],
  controllers: [FollowersController],
  imports: [TypeOrmModule.forFeature([Follower])],
})
export class FollowersModule {}
