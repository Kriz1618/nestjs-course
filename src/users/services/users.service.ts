import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>
  ) { }
  getHello(): string {
    return 'Hello World User!';
  }

  public async createUser(body: UserDto): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  };

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  };

  public async updateUser(id: string, body: UpdateUserDto): Promise<UpdateResult | null> {
    try {
      const user = await this.userRepository.update(id, body);

      if (!user.affected) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    try {
      const user = await this.userRepository.delete(id);

      if (!user.affected) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
};
