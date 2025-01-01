import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    if (new Date(data.startTime) >= new Date(data.endTime)) {
      throw new BadRequestException('Start time must be earlier than end time');
    }
    return this.prisma.schedule.create({ data });
  }

  findAll() {
    return this.prisma.schedule.findMany({ include: { tasks: true } });
  }

  async findOne(id: string) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return schedule;
  }

  update(id: string, data: any) {
    return this.prisma.schedule.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}

