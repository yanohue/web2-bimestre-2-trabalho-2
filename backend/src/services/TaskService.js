export default class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async test() {
        let test = 'test'
        return test;
    }

    async getAllTasks() {
        let tasks = await this.taskRepository.getAllTasks();
        return tasks;
    }
    
    async createTask(taskData) {
        let createdTask = await this.taskRepository.createTask(taskData);
        return createdTask;
    }
    
    async updateTask(taskId, newTaskData) {
        let updatedTask = await this.taskRepository.updateTask(taskId, newTaskData);
        return updatedTask;
    }
    
    async deleteTask(taskId) {
        let deleteTaskResult = await this.taskRepository.deleteTask(taskId);
        return deleteTaskResult;
    }
}