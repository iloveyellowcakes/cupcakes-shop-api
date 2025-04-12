import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/update-users-dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto) {
    const updateUser = await this.userService.updateUser(id, updateUserDto);
    if (!updateUser) throw new HttpException('User not found', 404);
    return updateUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deleteUser = await this.userService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User not found', 404);
    return deleteUser;
  }
}
