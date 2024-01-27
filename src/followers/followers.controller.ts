import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { FollowUserDTO } from './dto/FollowUser.dto';
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Get()
  getUserFollowers(@Request() req: any) {
    return this.followersService.getUserFollowers(req.user.id);
  }

  @Get('count')
  count(@Request() req: any) {
    return this.followersService.getUserFollowersCount(req.user.id);
  }

  @Get(':id/count')
  countByUser(@Param() params: any) {
    return this.followersService.getUserFollowersCount(params.id);
  }

  @Get(':id')
  getFollowersByUser(@Param() params: any) {
    return this.followersService.getUserFollowers(params.id);
  }

  @Post()
  async followUser(@Body() followUserDTO: FollowUserDTO, @Request() req: any) {
    try {
      const result = await this.followersService.followUser(
        req.user.id,
        followUserDTO.userToFollowId,
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
