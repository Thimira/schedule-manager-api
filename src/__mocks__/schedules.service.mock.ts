export const mockSchedulesService = {
  create: jest.fn().mockImplementation((data) => ({ 
    ...data, 
    id: 'mock-schedule-id' 
  })),
  findAll: jest.fn().mockResolvedValue([{ 
    id: 'mock-schedule-id', 
    accountId: 1, 
    agentId: 123, 
    startTime: new Date(), 
    endTime: new Date() 
  }]),
  findOne: jest.fn().mockResolvedValue({ 
    id: 'mock-schedule-id', 
    accountId: 1, 
    agentId: 123, 
    startTime: new Date(), 
    endTime: new Date() 
  }),
  update: jest.fn().mockResolvedValue({ 
    id: 'mock-schedule-id', 
    accountId: 1, 
    agentId: 123, 
    startTime: new Date(), 
    endTime: new Date() 
  }),
  remove: jest.fn().mockResolvedValue({ 
    id: 'mock-schedule-id', 
    accountId: 1, 
    agentId: 123, 
    startTime: new Date(), 
    endTime: new Date() 
  }),
};
