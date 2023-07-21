import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entity/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TaskDTO, TasksQueryDTO } from '../dto/task.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly projectService: ProjectsService
  ) {}

  public async createTask(body: TaskDTO, projectId: string): Promise<TaskEntity> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if (project === undefined) {
        throw new ErrorManager({ type: 'NOT_FOUND', message: 'Invalid project' })
      }
      return await this.taskRepository.save({
        ...body,
        project,
      });      
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async listTasks(projectId: string, query: TasksQueryDTO): Promise<TaskEntity[]> {
    try {
      const tasksQuery: any = { ...query, projectId }
      const tasks: TaskEntity[] = await this.taskRepository.find(tasksQuery);
      if (tasks.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not tasks were found',
        });
      }
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findTask(id: string): Promise<TaskEntity> {
    try {
      const task: TaskEntity = await this.taskRepository.findOneBy({ id });
      
      if (!task) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Tasks not found',
        });
      }
      return task;
    } catch (error) {
      throw new Error(error);
      
    }
  }

  public async updateTask(body: TasksQueryDTO, id: string): Promise<UpdateResult | undefined> {
    try {
      const task: UpdateResult = await this.taskRepository.update(id, body);
      if (task.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar proyecto',
        });
      }
      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteTask(id: string): Promise<DeleteResult | undefined> {
    try {
      const task: DeleteResult = await this.taskRepository.delete(id);
      if (task.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar proyecto',
        });
      }
      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
