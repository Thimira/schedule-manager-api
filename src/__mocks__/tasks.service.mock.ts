export const mockTasksService = {
  create: jest.fn().mockImplementation((data) => ({
    ...data,
    id: 'f3d4b5c3-4fa5-4b60-9b24-d0e6c8a4b1c3',
  })),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 'f3d4b5c3-4fa5-4b60-9b24-d0e6c8a4b1c3',
      accountId: 1,
      scheduleId: '9b6aa99b-a799-481a-abcc-c9a9712393db',
      startTime: new Date(),
      duration: 60,
      type: 'work',
    },
    {
      id: 'b69d81af-e4ed-4e26-8826-2e7a7bee6884',
      accountId: 2,
      scheduleId: '9b6aa99b-a799-481a-abcc-c9a9712393db',
      startTime: new Date(),
      duration: 30,
      type: 'break',
    },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: 'f3d4b5c3-4fa5-4b60-9b24-d0e6c8a4b1c3',
    accountId: 1,
    scheduleId: '9b6aa99b-a799-481a-abcc-c9a9712393db',
    startTime: new Date(),
    duration: 60,
    type: 'work',
  }),
  update: jest.fn().mockResolvedValue({
    id: 'f3d4b5c3-4fa5-4b60-9b24-d0e6c8a4b1c3',
    accountId: 1,
    scheduleId: '9b6aa99b-a799-481a-abcc-c9a9712393db',
    startTime: new Date(),
    duration: 90,
    type: 'work',
  }),
  remove: jest.fn().mockResolvedValue({
    id: 'f3d4b5c3-4fa5-4b60-9b24-d0e6c8a4b1c3',
    accountId: 1,
    scheduleId: '9b6aa99b-a799-481a-abcc-c9a9712393db',
    startTime: new Date(),
    duration: 60,
    type: 'work',
  }),
};
