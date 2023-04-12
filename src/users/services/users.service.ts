import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UpdateUserDto, UserToProjectDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly usersProjectsEntity: Repository<UsersProjectsEntity>,
  ) { }

  public async createUser(body: UserDto): Promise<UsersEntity> {
    try {
      const password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.userRepository.save({ ...body, password });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No records were found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDto; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: String): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No records were found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UpdateUserDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Record not updated',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Record not deleted',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }


  public async relationToProject(body: UserToProjectDTO) {
    try {
      return await this.usersProjectsEntity.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}