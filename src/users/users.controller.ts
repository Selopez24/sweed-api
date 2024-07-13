import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Private } from 'src/decorators/private';
import { Public } from 'src/decorators/public';
import createUserDTO from './dto/createUser.dto';
import getUserDTO from './dto/getUser.dto';
import { updateUserProfileDTO } from './dto/userProfile.dto';
import { UsersService } from './users.service';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param() params: any) {
    return this.usersService.findOne(params.id);
  }

  @Post()
  async create(@Body() createUserDTO: createUserDTO): Promise<getUserDTO> {
    try {
      const user = await this.usersService.create(createUserDTO);
      const { password, ...restUser } = user;

      return restUser;
    } catch (error) {
      return error.response;
    }
  }

  @Private()
  @Put('profile')
  updateUserProfile(@Body() updateUserProfileDTO: updateUserProfileDTO, @Req() req: any) {
    return this.usersService.updateUserProfile(req.user.id, updateUserProfileDTO);
  }
}
