import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateUserDto) {
    return this.userService.createNew(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateById(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
