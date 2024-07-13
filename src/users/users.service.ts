import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createUserDTO from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { getColumnsFromRepo } from 'src/utils/getColumnsFromRepo';
import { updateUserProfileDTO } from './dto/userProfile.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

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

  findByUsername(username: string, withPassword = false): Promise<User> {
    const columns = getColumnsFromRepo(this.usersRepository, [withPassword ? '' : 'password']);
    return this.usersRepository.findOne({
      select: columns,
      where: { username },
    });
  }

  findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findById(id: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ id });
    return user;
  }

  async updateUserPassword(id: string, newPassword: string): Promise<void> {
    await this.usersRepository.update(id, { password: newPassword });
  }

  async updateUserProfile(id: string, userProfile: updateUserProfileDTO) {
    return await this.usersRepository.update(id, { userProfile });
  }
}
