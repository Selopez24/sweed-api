import { Controller, Get, Param, Request } from '@nestjs/common';
import { FollowersService } from './followers.service';

@Controller('followees')
export class FolloweesController {
  constructor(private followersService: FollowersService) {}

  @Get()
  getUserFollowees(@Request() req: any) {
    return this.followersService.getUserFollowees(req.user.id);
  }

  @Get('count')
  getUserFolloweesCount(@Request() req: any) {
    return this.followersService.getUserFolloweesCount(req.user.id);
  }

  @Get(':id')
  getUserFolloweesById(@Param() params: any) {
    return this.followersService.getUserFollowees(params.id);
  }

  @Get(':id/count')
  getUserFolloweesByIdCount(@Param() params: any) {
    return this.followersService.getUserFolloweesCount(params.id);
  }
}
