import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.schedule.create({ data });
  }

  findAll() {
    return this.prisma.schedule.findMany({ include: { tasks: true } });
  }

  findOne(id: string) {
    return this.prisma.schedule.findUnique({ where: { id }, include: { tasks: true } });
  }

  update(id: string, data: any) {
    return this.prisma.schedule.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}

