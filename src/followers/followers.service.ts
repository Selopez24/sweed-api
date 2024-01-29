import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Follower } from './follower.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
  ) {}

  followUser(currentUserId: string, userToFollowId: string) {
    return this.followersRepository.save({
      followerId: currentUserId,
      followeeId: userToFollowId,
    });
  }

  async getUserFollowers(userId: string) {
    const followers = await this.followersRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect(User, 'user', 'user.id = follower.followerId')
      .where('follower.followeeId = :userId', { userId })
      .getRawMany();

    return followers.map((entity) => ({
      id: entity.user_id,
      userName: entity.user_username,
      firstName: entity.user_firstName,
      lastName: entity.user_lastName,
      isActive: entity.user_isActive,
    }));
  }

  getUserFollowersCount(userId: string) {
    return this.followersRepository.count({ where: { followeeId: userId } });
  }

  unfollowUser(userToUnfollowId: string, currentUserId: string) {
    return this.followersRepository.delete({
      followeeId: userToUnfollowId,
      followerId: currentUserId,
    });
  }
}
