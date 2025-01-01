import { IsUUID, IsInt, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsUUID()
  id: string;

  @IsInt()
  accountId: number;

  @IsInt()
  agentId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
