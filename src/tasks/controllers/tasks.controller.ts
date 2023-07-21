import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDTO, TasksQueryDTO } from '../dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)

export class TasksController {
  constructor(
    private readonly taskService: TasksService
  ) { }

  @ApiParam({ name: 'projectId'})
  @ApiHeader({ name: 'x_token' })
  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(@Body() body: TaskDTO, @Param('projectId') projectId: string) {
    return this.taskService.createTask(body, projectId);
  }

  @ApiParam({ name: 'projectId'})
  @ApiHeader({ name: 'x_token' })
  @AccessLevel('DEVELOPER')
  @Get('all/:projectId')
  public async listTasks(@Query() query: TasksQueryDTO, @Param('projectId') projectId: string) {
    return this.taskService.listTasks(projectId, query);
  }

  @ApiParam({ name: 'taskId'})
  @ApiHeader({ name: 'x_token' })
  @AccessLevel('OWNER')
  @Put('edit/:taskId')
  public async updateTask(
    @Param('taskId', new ParseUUIDPipe()) id: string,
    @Body() body: TaskDTO,
  ): Promise<any> {
    return await this.taskService.updateTask(body, id);
  }

  @ApiParam({ name: 'taskId'})
  @ApiHeader({ name: 'x_token' })
  @AccessLevel('OWNER')
  @Delete('delete/:taskId')
  public async deleteProject(@Param('taskId', new ParseUUIDPipe()) id: string) {
    return await this.taskService.deleteTask(id);
  }
}
