import TaskService from "../services/TaskService";
import TaskModel from "../models/TaskModel.js";
import StatusModel from "../models/StatusModel.js";
import StatusService from "../services/StatusService.js";

const logout_button = document.querySelector('#logout_button');

const task_form = document.querySelector('#task_form')
const create_button = document.querySelector('#create_button');

const update_form = document.querySelector('#update_form');
const update_button = document.querySelector('#update_button');

const board = document.querySelector('#board');

var tasks = []; // list of all tasks
var statusList = []; // available statuses
var target = null;

document.addEventListener('DOMContentLoaded', () => {
    load();
});

async function load() {
    try {
        if(tasks.length == 0) {
            const taskService = new TaskService(new TaskModel({}));
            tasks = await taskService.handleGetAllTasks();
        }
        if(statusList.length == 0) {
            const statusService = new StatusService(new StatusModel(null, null));
            statusList = await statusService.handleGetStatusList();
        }
        renderTasks();
    } catch(error) {
        console.error(error);
        throw new Error('Failed to load!');
    }
}

logout_button.addEventListener('click', (event) => {
    window.location.href = './login.html';
})

create_button.addEventListener('click', async (event) => {
    event.preventDefault();
    getTaskData(event);   
});

update_button.addEventListener('click', (event) => {
    event.preventDefault();
    getUpdateData();
});

function getTaskData() {
    let taskData = {}

    if(task_form.checkValidity()) {
        let title = task_form.title_input.value;
        let description = task_form.description_input.value;
        let dueDate = task_form.dueDate_input.value;
        let id_status = task_form.status_input.value;

        taskData = {
            id: null,
            title: title, 
            description: description,
            dueDate: dueDate,
            id_status: id_status,
        }
        task_form.reset();
    } else {
        task_form.classList.add('was-validated');
    }

    if(taskData.title != null && taskData.description != null && taskData.dueDate != null && taskData.id_status != null) {
        createTask(taskData);
    } else {
        console.log('Something is not quite right...');
    }
}

function getUpdateData() {
    let updateData = {}

    if(update_form.checkValidity()) {
        let title = update_form.title_update.value;
        let description = update_form.description_update.value;
        let dueDate = update_form.dueDate_update.value;
        let id_status = update_form.status_update.value;

        updateData = {
            id: target.id,
            title: title, 
            description: description,
            dueDate: dueDate,
            id_status: id_status,
        }
        update_form.reset();
    } else {
        update_form.classList.add('was-validated');
    }
    if(updateData.title != null && updateData.description != null && updateData.dueDate != null && updateData.id_status != null){
        updateTask(updateData);
    }
}

async function createTask(taskData) {
    const taskService = new TaskService(new TaskModel(taskData));

    const createdTask = await taskService.handleTaskCreation();
    
    tasks.push(createdTask);

    renderTasks();
}

function requestUpdate(index) {
    target = tasks[index];
    update_form.title_update.value = target.title;
    update_form.description_update.value = target.description;
    update_form.dueDate_update.value = target.dueDate;
    update_form.status_update.value = target.id_status;
}

async function updateTask(updateData) {
    const taskService = new TaskService(new TaskModel(updateData));
    const updatedTask = await taskService.handleTaskUpdate();

    const index = tasks.findIndex(task => task.id == target.id);
    if(index != -1) {
        tasks[index].title = updatedTask.title;
        tasks[index].description = updatedTask.description;
        tasks[index].dueDate = updatedTask.dueDate;
        tasks[index].id_status = updatedTask.id_status;
    }

    renderTasks();
}

function requestDelete(index) {
    const target = tasks[index];
    deleteTask(target);
}

async function deleteTask(target) {
    try {
        const taskService = new TaskService(new TaskModel(target));
        const deletedTaskResult = await taskService.handleTaskDeletion();

        tasks = tasks.filter(task => task.id != target.id);

        renderTasks();
    } catch (error) {
        console.error(error)
    }
}

function renderTasks() {
    board.innerHTML = '';
    
    for(let i = 0; i < tasks.length; i++) {
        let div = document.createElement('div');
        let statusText;
        let color = ['postItYellow','postItBlue','postItOrange ','postItRed','postItGreen'];

        statusList.forEach(status => {
            if(status.id == tasks[i].id_status) {
                statusText = status.status;
            }
        })

        div.innerHTML = `
            <div class="card ${color[tasks[i].id_status - 1]}  shadow">
                <div class="card-body">
                    <p class="h5 card-title mb-2">${tasks[i].title}</p>
                    <p class="card-text mb-2">${tasks[i].description}</p>
                    <p class="card-text mb-2">Vencimento: ${tasks[i].dueDate}</p>
                    <p class="card-text mb-2">Status: ${statusText}</p>
                </div>
                <div class="card-footer d-flex justify-content-center">
                    <button type="button" class="container-sm col-5 btn btn-outline-dark">deletar</button>
                    <button type="button" class="container-sm col-5 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#update_modal">editar</button>
                </div>
            </div>
        `

        div.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'p-2');

        div.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', () => {requestDelete(i);});
        div.childNodes[1].childNodes[3].childNodes[3].addEventListener('click', () => {requestUpdate(i);});

        board.appendChild(div);
    }
}