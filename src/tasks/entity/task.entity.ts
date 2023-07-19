import { TASK_STATUS } from "../../constants/task-status";
import { BaseEntity } from "../../config/base.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: 'task'})
export class TaskEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;
 
  @Column({ type: 'enum', enum: TASK_STATUS })
  status: TASK_STATUS;

  @Column()
  respponsableName: string;

  @ManyToOne(()=> ProjectsEntity, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id'
  })
  project: ProjectsEntity;
}
