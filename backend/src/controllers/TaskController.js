export default class TaskController {
    constructor(app, authControl, taskService) {
        this.app = app;
        this.authControl = authControl;
        this.taskService = taskService;
    }

/*/////////////////////////////////////////////////////////////////////////////
                    ENDPOINTS
*//////////////////////////////////////////////////////////////////////////////

    async start() {
        this.app.get('/test', this.authControl.authToken, this.test.bind(this));
        this.app.get('/tasks', this.authControl.authToken, this.getAllTasks.bind(this));
        this.app.post('/tasks/create', this.authControl.authToken, this.createTask.bind(this));
        this.app.put('/tasks/update/:id', this.authControl.authToken, this.updatedTask.bind(this));
        this.app.delete('/tasks/delete/:id', this.authControl.authToken, this.deleteTask.bind(this));
    }

    async test(req, res) {
        res.status(200).send('this is a test');
    }


    async getAllTasks(req, res) {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.status(200).send(tasks);
        } catch(error) {
            res.status(500).send('Failed to retrieve tasks!');
        }
    }


    async createTask(req, res) {
        const taskData = req.body;
        try {
            const createdTask = await this.taskService.createTask(taskData)
            res.status(201).send(createdTask);
        } catch(error) {
            res.status(500).send('Failed to create task!');
        }
    }


    async updatedTask(req, res) {
        const taskId = req.params.id;
        const newTaskData = req.body;
    
        try {
            const updatedTask = await this.taskService.updateTask(taskId, newTaskData);
            res.status(200).send(updatedTask);
        }
        catch(error) {
            res.status(500).send(`Failed to update task!`);
        }
    }


    async deleteTask(req, res) {
        const taskId = req.params.id;
    
        try {
            const deleteTaskResult = await this.taskService.deleteTask(taskId);
            res.status(200).send(deleteTaskResult);
        } catch(error) {
            res.status(500).send(`Failed to delete task!`);
        }
    }

}