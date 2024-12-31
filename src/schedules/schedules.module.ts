import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';

@Module({
  imports: [PrismaModule],
  providers: [SchedulesService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
