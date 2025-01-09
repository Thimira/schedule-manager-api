export const mockTasksService = {
  create: jest.fn().mockImplementation((data) => ({
    ...data,
    id: 'mock-task-id',
  })),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 'mock-task-id',
      accountId: 1,
      scheduleId: 'mock-schedule-id',
      startTime: new Date(),
      duration: 60,
      type: 'work',
    },
    {
      id: 'mock-task-id-1',
      accountId: 2,
      scheduleId: 'mock-schedule-id',
      startTime: new Date(),
      duration: 30,
      type: 'break',
    },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: 'mock-task-id',
    accountId: 1,
    scheduleId: 'mock-schedule-id',
    startTime: new Date(),
    duration: 60,
    type: 'work',
  }),
  update: jest.fn().mockResolvedValue({
    id: 'mock-task-id',
    accountId: 1,
    scheduleId: 'mock-schedule-id',
    startTime: new Date(),
    duration: 90,
    type: 'work',
  }),
  remove: jest.fn().mockResolvedValue({
    id: 'mock-task-id',
    accountId: 1,
    scheduleId: 'mock-schedule-id',
    startTime: new Date(),
    duration: 60,
    type: 'work',
  }),
};
