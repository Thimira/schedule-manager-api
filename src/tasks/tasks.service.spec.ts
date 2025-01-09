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

  describe('findAll', () => {
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

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const mockTask = { 
        id: 'mock-task-id', 
        accountId: 1, 
        scheduleId: 'mock-schedule-id', 
        startTime: new Date(), 
        duration: 60, 
        type: 'work' 
      };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      const result = await service.findOne('mock-task-id');
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({ where: { id: 'mock-task-id' } });
    });

    it('should throw NotFoundException if task is not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-task-id')).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({ where: { id: 'non-existent-task-id' } });
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      const mockTask = { 
        id: 'mock-task-id', 
        accountId: 1, 
        scheduleId: 'mock-schedule-id', 
        startTime: new Date(), 
        duration: 60, 
        type: 'work'
      };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.task.delete.mockResolvedValue(mockTask);

      const result = await service.remove('mock-task-id');
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({ where: { id: 'mock-task-id' } });
    });

    it('should throw NotFoundException if task does not exist', async () => {
      mockPrismaService.task.delete.mockRejectedValue(new NotFoundException(`Task with ID non-existent-task-id not found`));

      await expect(service.remove('non-existent-task-id')).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({ where: { id: 'mock-task-id' } });
    });
  });
});
