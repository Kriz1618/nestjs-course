import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDto, UpdateUserDto, UserToProjectDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usersService.createUser(body);
  }

  @ApiHeader({ name: 'x_token' })
  @Roles('ADMIN')
  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @ApiParam({ name: 'id'})
  @ApiHeader({ name: 'x_token' })
  @ApiResponse({ status: 400, description: 'User not found' })
  @Get(':id')
  public async findUserById(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @ApiHeader({ name: 'x_token' })
  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDTO) {
    return await this.usersService.relationToProject(body);
  }

  @ApiParam({ name: 'id'})
  @ApiHeader({ name: 'x_token' })
  @Put('edit/:id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiParam({ name: 'id'})
  @Delete('delete/:id')
  public async deleteUser(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
