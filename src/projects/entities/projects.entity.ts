import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../../interfaces/project.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { TaskEntity } from '../../tasks/entity/task.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TaskEntity, (tasks) => tasks.project)
  tasks: TaskEntity[]
};
