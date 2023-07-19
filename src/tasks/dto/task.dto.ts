import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TASK_STATUS } from "src/constants/task-status";
import { ProjectDTO } from "src/projects/dto/projects.dto";

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  
  @IsNotEmpty()
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;
  
  @IsNotEmpty()
  @IsString()
  respponsableName: string;

  @IsOptional()
  project: ProjectDTO;
}

