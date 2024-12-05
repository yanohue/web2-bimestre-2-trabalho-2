class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
        // code here;
    }

    async handleGetAllTasks() {
        try {
            const tasks = await this.taskModel.getAllTasks();
            return tasks;  
        } catch(error) {
            throw new Error('Failed to get tasks!');
        }
    }

    async handleTaskCreation() {
        try {
            const createdTask = await this.taskModel.createTask();
            return createdTask;
        } catch(error) {
            throw new Error('Failed to create task!');
        }
    }

    async handleTaskUpdate() {
        try {
            const updatedTask = await this.taskModel.updateTask();
            return updatedTask;
        } catch(error) {
            throw new Error('Failed to update task!');
        }
    }

    async handleTaskDeletion() {
        try {
            const deletedTaskResult = await this.taskModel.deleteTask();
            return deletedTaskResult;
        } catch(error) {
            throw new Error('Failed to handle deletion!');
        }
    }

}

export default TaskService;