import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import createUserDTO from './dto/createUser.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDTO: createUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }
}
