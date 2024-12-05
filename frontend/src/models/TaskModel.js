class TaskModel {
    constructor(taskData) {
        this.taskData = taskData;
    }
    
    async getAllTasks() {
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                throw new Error('Token not found!');
            }

            const header = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch('http://localhost:3000/tasks', header);
            if(!response.ok) {
                throw new Error('Failed to fetch tasks!');
            }
            const tasks = await response.json();
            return tasks;
        } catch(error) {
            throw new Error('Failed to fetch tasks: ' + error.message);
        }
    }

    async createTask() {
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                throw new Error('Token not found!');
            }

            const header = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.taskData)
            }

            const response = await fetch('http://localhost:3000/tasks/create', header);
            if(!response.ok) {
                throw new Error('Failed to create task!');
            }
            const createdTask = await response.json();
            return createdTask;
        } catch(error) {
            throw new Error('Failed to create task: ' + error.message);
        }
    }

    async updateTask() {
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                throw new Error('Token not found!');
            }

            const header = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.taskData)
            }
            const response = await fetch(`http://localhost:3000/tasks/update/${this.taskData.id}`, header);
            if(!response.ok) {
                throw new Error('Failed to update task!');
            }
            const updatedTask = await response.json();
            return updatedTask;
        } catch(error) {
            throw new Error('Failed to update task: ' + error.message);
        }
    }

    async deleteTask() {
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                throw new Error('Token not found!');
            }
            const header = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(`http://localhost:3000/tasks/delete/${this.taskData.id}`, header);
            if(!response.ok) {
                throw new Error('Failed to delete task!');
            }
            const deletedTaskResult = await response.json();
            return deletedTaskResult;
        } catch(error) {
            throw new Error('Failed to delete task!');
        }
    }

}

export default TaskModel;