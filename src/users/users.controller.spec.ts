import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.sevice';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      createUser: (body: CreateUserDto) => {
        return Promise.resolve({
          ...body,
          id: 1,
        } as UsersEntity);
      },
      findUserById: (id: number) =>
        Promise.resolve({
          id,
          email: 'test1@gmail.com',
          password: '123',
        } as UsersEntity),
      findUserByEmail: (email: string) =>
        Promise.resolve([{ id: 2, email, password: '123' } as UsersEntity]),
      deleteUser: (id: number) => Promise.resolve({ id } as UsersEntity),
      updateUser: (id: number, attrs: Partial<UsersEntity>) =>
        Promise.resolve({
          ...attrs,
          id,
        } as UsersEntity),
    };
    fakeAuthService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
