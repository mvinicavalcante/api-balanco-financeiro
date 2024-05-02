import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserDTO,
  })
  @Post('')
  async create(user: CreateUserDTO): Promise<CreateUserDTO> {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
  })
  @Get('')
  // ! TODO -> Adicionar guard para apenas admin conseguir acessar
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }
}
