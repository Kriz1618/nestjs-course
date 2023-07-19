import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDTO } from '../dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)

export class TasksController {
  constructor(
    private readonly taskService: TasksService
  ) { }

  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(@Body() body: TaskDTO, @Param('projectId') projectId: string) {
    return this.taskService.createTask(body, projectId);
  }
}