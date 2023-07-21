import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TASK_STATUS } from "src/constants/task-status";
import { ProjectDTO } from "src/projects/dto/projects.dto";

export class TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @ApiProperty()
  @IsOptional()
  project: ProjectDTO;
}

export class TasksQueryDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable?: string;
  
  @IsOptional()
  @IsEnum(TASK_STATUS)
  @ApiProperty({ enum: TASK_STATUS })
  status: TASK_STATUS;
}
