import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const createUserDto: CreateUserDto = {
    username: 'user',
    email: 'user-test@test.com',
    password: '123456',
    first: 'firstUser',
    last: 'lastUser',
    location: null,
    locale: null,
    gender: null,
    accessToken: null,
    tutorial: { done: '1' },
    isBusiness: true,
    roles: null,
    collapsed: null,
    emailPrev: 'user-test@test.com',
    id: null,
    code: null,
    hashedPassword: null,
    creationDate: null,
  };

  const mockUser = {
    tutorial: { done: '1' },
    _id: '6272bd051696dfbbcebf1acf',
    id: 'idguadatest1',
    username: null,
    email: 'leila_test1@nest.com',
    password: 'qwerty123',
    first: 'leila',
    last: 'caraca',
    location: null,
    locale: null,
    gender: null,
    accessToken: null,
    isBusiness: true,
    roles: null,
    collapsed: null,
    emailPrev: 'leila.test@calcubox.com',
    creationDate: new Date('2022-05-04T13:39:58.356Z'),
    code: null,
    hashedPassword: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Cat #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Cat #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Cat #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });
  it('should be defined', async () => {
    await service.findAll();
    expect(controller).toBeDefined();
  });
});
