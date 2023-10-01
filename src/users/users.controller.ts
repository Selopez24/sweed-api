import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import createUserDTO from './dto/createUser.dto';
import getUserDTO from './dto/getUser.dto';
import { UsersService } from './users.service';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
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
}
