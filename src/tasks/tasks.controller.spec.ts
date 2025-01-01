import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { mockTasksService } from '../__mocks__/tasks.service.mock';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const date_val = new Date();
      enum TaskType {
        BREAK = 'break',
        WORK = 'work',
      }
      const dto = { id: 'mock-task-id', accountId: 1, scheduleId: 'mock-schedule-id', startTime: date_val.toString(), duration: 60, type: TaskType.WORK };
      const mockTask = { ...dto };
      mockTasksService.create.mockResolvedValue(mockTask);

      const result = await controller.create(dto);
      expect(result).toEqual(mockTask);
      expect(mockTasksService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 'mock-task-id', accountId: 1, scheduleId: 'mock-schedule-id', startTime: new Date(), duration: 60, type: 'work' },
      ];
      mockTasksService.findAll.mockResolvedValue(mockTasks);

      const result = await controller.findAll();
      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific task', async () => {
      const mockTask = { id: 'mock-task-id', accountId: 1, scheduleId: 'mock-schedule-id', startTime: new Date(), duration: 60, type: 'work' };
      mockTasksService.findOne.mockResolvedValue(mockTask);

      const result = await controller.findOne('mock-task-id');
      expect(result).toEqual(mockTask);
      expect(mockTasksService.findOne).toHaveBeenCalledWith('mock-task-id');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto = { duration: 90 };
      const mockUpdatedTask = { id: 'mock-task-id', ...dto, accountId: 1, scheduleId: 'mock-schedule-id', startTime: new Date(), type: 'work' };
      mockTasksService.update.mockResolvedValue(mockUpdatedTask);

      const result = await controller.update('mock-task-id', dto);
      expect(result).toEqual(mockUpdatedTask);
      expect(mockTasksService.update).toHaveBeenCalledWith('mock-task-id', dto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const mockTask = { id: 'mock-task-id', accountId: 1, scheduleId: 'mock-schedule-id', startTime: new Date(), duration: 60, type: 'work' };
      mockTasksService.remove.mockResolvedValue(mockTask);

      const result = await controller.remove('mock-task-id');
      expect(result).toEqual(mockTask);
      expect(mockTasksService.remove).toHaveBeenCalledWith('mock-task-id');
    });
  });
});
