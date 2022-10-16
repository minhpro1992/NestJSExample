import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUsersRepo: Repository<UsersEntity>;
  beforeEach(async () => {
    fakeUsersRepo = {} as Repository<UsersEntity>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: Repository,
          useValue: fakeUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
