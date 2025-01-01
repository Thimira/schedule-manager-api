import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = {
      accountId: 1,
      scheduleId: 'mock-schedule-id',
      startTime: new Date(),
      duration: 60,
      type: 'work',
    };
    const mockTask = { ...taskData, id: 'mock-task-id' };
    mockPrismaService.task.create.mockResolvedValue(mockTask);

    const result = await service.create(taskData);
    expect(result).toEqual(mockTask);
    expect(mockPrismaService.task.create).toHaveBeenCalledWith({ data: taskData });
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
