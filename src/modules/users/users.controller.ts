import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsAuthenticated } from 'src/guards/IsAuthenticated.guard';
import { AuthorizeAdminAccountGuard } from 'src/guards/isAdmin.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @UseGuards(IsAuthenticated, AuthorizeAdminAccountGuard)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserDTO,
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User created is forbidden',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(@Body() user: CreateUserDTO): Promise<CreateUserDTO> {
    return this.usersService.create(user);
  }

  @Get('')
  @UseGuards(IsAuthenticated, AuthorizeAdminAccountGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User find all is forbidden',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }
}
