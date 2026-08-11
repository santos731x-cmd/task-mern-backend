
const { getTasks, setTask, updateTask } = require('../controllers/taskController');
const Task = require('../models/taskModel');

jest.mock('../models/taskModel');

test('should get tasks for a user', async () => {
    const req = { user: { id: 'user-id' } };
    // Mocking tasks for the user
    const tasks = [
        { _id: 'task-id-1', text: 'Task 1', user: 'user-id' },
        { _id: 'task-id-2', text: 'Task 2', user: 'user-id' },
    ];
    // Mocking the find method to return tasks for the user
    Task.find.mockResolvedValue(tasks);
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    await getTasks(req, res);
    // Ensure that the response contains the expected tasks
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
});

test('should set a new task for a user', async () => {
    const req = { user: { id: 'user-id' }, body: { text: 'New Task' } };
    // Mocking the created task
    const task = { _id: 'new-task-id', text: 'New Task', user: 'user-id' };
    // Mocking the create method to return the new task
    Task.create.mockResolvedValue(task);
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    await setTask(req, res);
    // Ensure that the response contains the new task
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(task);
});

test('should return a 400 error for missing task text', async () => {
    const req = { user: { id: 'user-id' }, body: {} }; 
    // Missing the “text” field
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    await expect(setTask(req, res)).rejects.toThrow('Please enter a task');
    expect(res.status).toHaveBeenCalledWith(400);
});


