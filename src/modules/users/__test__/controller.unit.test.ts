import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { UserMock } from './mocks/user.mock';

describe('Users -> Controller -> Unit Test', () => {
  let usersController: UsersController;

  const user = new UserMock();
  const usersList = UserMock.getList();

  const usersServiceMock = {
    create: jest.fn().mockReturnValue(user),
    findAll: jest.fn().mockReturnValue(usersList),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate routes', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });

    it('should be able to create a user', async () => {
      const newUser = await usersController.create(user);

      expect(newUser).toEqual(user);
      expect(usersServiceMock.create).toHaveBeenCalledTimes(1);
      expect(usersServiceMock.create).toHaveBeenCalledWith(user);
    });

    it('should be able to list all users', async () => {
      const allUsers = await usersController.findAll();

      expect(allUsers).toEqual(usersList);
      expect(usersServiceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
