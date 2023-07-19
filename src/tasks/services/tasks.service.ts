import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TaskDTO } from '../dto/task.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
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
}
