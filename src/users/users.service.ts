import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createUserDTO from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: createUserDTO): Promise<User> {
    const user = await this.findByEmail(createUserDTO.email);

    if (user) {
      throw new ForbiddenException('User already exists');
    }

    const { password } = createUserDTO;

    const saltRounds = 11;

    const hash = await bcrypt.hash(password, saltRounds);

    return this.usersRepository.save({ ...createUserDTO, password: hash });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
