import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService, useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task when the schedule exists', async () => {
      const taskData = {
        scheduleId: 'mock-schedule-id',
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: 'work',
      };
      const mockSchedule = { id: 'mock-schedule-id' };
      const mockTask = { ...taskData, id: 'mock-task-id' };

      mockPrismaService.schedule.findUnique.mockResolvedValue(mockSchedule); // Mock schedule exists
      mockPrismaService.task.create.mockResolvedValue(mockTask); // Mock task creation

      const result = await service.create(taskData);

      expect(result).toEqual(mockTask);
      expect(mockPrismaService.schedule.findUnique).toHaveBeenCalledWith({ where: { id: taskData.scheduleId } });
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({ data: taskData });
    });

    it('should throw NotFoundException if the schedule does not exist', async () => {
      const taskData = {
        scheduleId: 'non-existent-schedule-id',
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: 'work',
      };

      mockPrismaService.schedule.findUnique.mockResolvedValue(null); // Mock schedule does not exist

      await expect(service.create(taskData)).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.schedule.findUnique).toHaveBeenCalledWith({ where: { id: taskData.scheduleId } });
      // expect(mockPrismaService.task.create).not.toHaveBeenCalled(); // Task creation should not be called
    });
  });

  it('should return all tasks', async () => {
    const mockTasks = [
      { id: 'mock-task-id', accountId: 1, scheduleId: 'mock-schedule-id', startTime: new Date(), duration: 60, type: 'work' },
    ];
    mockPrismaService.task.findMany.mockResolvedValue(mockTasks);

    const result = await service.findAll();
    expect(result).toEqual(mockTasks);
    expect(mockPrismaService.task.findMany).toHaveBeenCalled();
  });
});
