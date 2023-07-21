import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ACCESS_LEVEL, ROLES } from "src/constants/roles";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
import { UsersEntity } from "../entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
};

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName: string;
  
  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
};

export class UserToProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
};
