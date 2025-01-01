import { IsUUID, IsInt, IsDateString, IsEnum } from 'class-validator';

export enum TaskType {
  BREAK = 'break',
  WORK = 'work',
}

export class CreateTaskDto {
  @IsUUID()
  id: string;

  @IsInt()
  accountId: number;

  @IsUUID()
  scheduleId: string;

  @IsDateString()
  startTime: string;

  @IsInt()
  duration: number;

  @IsEnum(TaskType)
  type: TaskType;
}

