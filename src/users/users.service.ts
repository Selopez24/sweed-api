import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'hola',
      password: 'chao',
    },
    {
      userId: 2,
      username: 'qmas',
      password: 'todobn',
    },
  ];

  async findOne(usersname: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === usersname);
  }
}
