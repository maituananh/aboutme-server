import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.provider';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }
}
