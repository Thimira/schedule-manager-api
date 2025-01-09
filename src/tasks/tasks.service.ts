import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const scheduleId = data.scheduleId;
    const schedule = await this.prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule) {
      throw new NotFoundException(`Schedule must exist before adding tasks to it. Schedule with ID ${scheduleId} not found`);
    }
    return this.prisma.task.create({ data });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, data: any) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (data.scheduleId) {
      const scheduleId = data.scheduleId;
      const schedule = await this.prisma.schedule.findUnique({ where: { id: scheduleId } });
      if (!schedule) {
        throw new NotFoundException(`Schedule must exist before adding tasks to it. Schedule with ID ${scheduleId} not found`);
      }
    }
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.delete({ where: { id } });
  }
}

