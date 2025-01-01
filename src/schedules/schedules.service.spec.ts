import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a schedule', async () => {
    const date_start = new Date();
    const date_end = new Date(date_start.getTime() + 60 * 60000);

    const scheduleData = {
      accountId: 1,
      agentId: 123,
      startTime: date_start,
      endTime: date_end,
    };
    const mockSchedule = { ...scheduleData, id: 'mock-schedule-id' };
    mockPrismaService.schedule.create.mockResolvedValue(mockSchedule);

    const result = await service.create(scheduleData);
    expect(result).toEqual(mockSchedule);
    expect(mockPrismaService.schedule.create).toHaveBeenCalledWith({ data: scheduleData });
  });

  it('should return all schedules', async () => {
    const mockSchedules = [
      { id: 'mock-schedule-id', accountId: 1, agentId: 123, startTime: new Date(), endTime: new Date() },
    ];
    mockPrismaService.schedule.findMany.mockResolvedValue(mockSchedules);

    const result = await service.findAll();
    expect(result).toEqual(mockSchedules);
    expect(mockPrismaService.schedule.findMany).toHaveBeenCalled();
  });
});
