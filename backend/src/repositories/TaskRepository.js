export default class TaskRepository {
    constructor(Task, Status) {
        this.Task = Task;
        this.Status = Status;
    }
    
/*////////////////////////////////////////////////////////////////////////////
                    QUERIES
*/////////////////////////////////////////////////////////////////////////////

    async getAllTasks() {
        try {
            const tasks = await this.Task.findAll({
                where: {
                    active: true
                }
            });
            return tasks;
        } catch(error) {
            throw new Error('Failed to retrieve tasks from database!');
        }
    }

    async createTask(taskData) {
        try {
            const { id, title, description, dueDate, id_status } = taskData;

            const status = await this.Status.findByPk(id_status);

            if(!status) {
                throw new Error('Failed to find status!');
            }
            const createdTask = await this.Task.create({
                title: title,
                description: description,
                dueDate: dueDate,
                id_status: status.id
            });
            return createdTask;
        } catch(error) {
            throw new Error('Failed to create task!');
        }
    }

    async updateTask(taskId, newTaskData) {
        try {
            const updatedRowsCount = await this.Task.update(newTaskData, {
                where: {
                    id: taskId,
                    active: true
                }
                // returning: true, postgres only
            });
            const updatedTask = await this.Task.findByPk(taskId);
            // console.log(updatedTask);
            if(!updatedRowsCount) {
                throw new Error('Task not found or is inactive!');
            }
            return updatedTask;
        } catch(error) {
            console.log(error);
            throw new Error('Failed to update task!');
        }
    }

    async deleteTask(taskId) {
        try {
            const deletedRowsCount = await this.Task.update({active: false},
            {
                where: {
                    id: taskId,
                    active: true
                }
            });
            if(deletedRowsCount === 0) {
                throw new Error('Task not found or is already inactive');
            }
            const deletedTaskResult = { message:'Task deleted succesfully'};
            return deletedTaskResult;
        }
        catch(error) {
            throw new Error('Failed to delete task!');
        }
    }

}