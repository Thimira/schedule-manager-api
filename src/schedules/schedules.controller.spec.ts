import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { mockSchedulesService } from '../__mocks__/schedules.service.mock';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        { provide: SchedulesService, useValue: mockSchedulesService },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a schedule', async () => {
      const date_start = new Date();
      const date_end = new Date(date_start.getTime() + 60 * 60000);
      const dto = { id: 'mock-schedule-id', accountId: 1, agentId: 123, startTime: date_start.toString(), endTime: date_end.toString() };
      const mockSchedule = { ...dto };
      mockSchedulesService.create.mockResolvedValue(mockSchedule);

      const result = await controller.create(dto);
      expect(result).toEqual(mockSchedule);
      expect(mockSchedulesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all schedules', async () => {
      const mockSchedules = [
        { id: 'mock-schedule-id', accountId: 1, agentId: 123, startTime: new Date(), endTime: new Date() },
      ];
      mockSchedulesService.findAll.mockResolvedValue(mockSchedules);

      const result = await controller.findAll();
      expect(result).toEqual(mockSchedules);
      expect(mockSchedulesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific schedule', async () => {
      const mockSchedule = { id: 'mock-schedule-id', accountId: 1, agentId: 123, startTime: new Date(), endTime: new Date() };
      mockSchedulesService.findOne.mockResolvedValue(mockSchedule);

      const result = await controller.findOne('mock-schedule-id');
      expect(result).toEqual(mockSchedule);
      expect(mockSchedulesService.findOne).toHaveBeenCalledWith('mock-schedule-id');
    });
  });

  describe('update', () => {
    it('should update a schedule', async () => {
      const date_start = new Date();
      const date_end = new Date(date_start.getTime() + 60 * 60000);
      const dto = { startTime: date_start.toString(), endTime: date_end.toString() };
      const mockUpdatedSchedule = { id: 'mock-schedule-id', ...dto, accountId: 1, agentId: 123 };
      mockSchedulesService.update.mockResolvedValue(mockUpdatedSchedule);

      const result = await controller.update('mock-schedule-id', dto);
      expect(result).toEqual(mockUpdatedSchedule);
      expect(mockSchedulesService.update).toHaveBeenCalledWith('mock-schedule-id', dto);
    });
  });

  describe('remove', () => {
    it('should remove a schedule', async () => {
      const mockSchedule = { id: 'mock-schedule-id', accountId: 1, agentId: 123, startTime: new Date(), endTime: new Date() };
      mockSchedulesService.remove.mockResolvedValue(mockSchedule);

      const result = await controller.remove('mock-schedule-id');
      expect(result).toEqual(mockSchedule);
      expect(mockSchedulesService.remove).toHaveBeenCalledWith('mock-schedule-id');
    });
  });
});
