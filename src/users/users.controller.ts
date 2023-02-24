import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import createUserDTO from './dto/createUser.dto';
import { User } from './user.entity';
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
  create(@Body() createUserDTO: createUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }
}
