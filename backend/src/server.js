import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import AuthController from "./controllers/AuthController.js";
import TaskController from "./controllers/TaskController.js";
import StatusController from "./controllers/StatusController.js";

import AuthService from "./services/AuthService.js";
import TaskService from "./services/TaskService.js";
import StatusService from "./services/statusService.js";

import AuthRepository from "./repositories/AuthRepository.js";
import TaskRepository from "./repositories/TaskRepository.js";
import StatusRepository from "./repositories/StatusRepository.js";

import UserEntity from "./domain/UserEntity.js";
import TaskEntity from "./domain/TaskEntity.js";
import StatusEntity from "./domain/StatusEntity.js";

import DataBase from "./resources/DataBase.js";


/*////////////////////////////////////////////////////////////////////////////
                STARTUP
*/////////////////////////////////////////////////////////////////////////////

dotenv.config({ path: './src/resources/.env' });

const app = express();

const corsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200,
};

/*////////////////////////////////////////////////////////////////////////////
                MIDDLEWARE
*/////////////////////////////////////////////////////////////////////////////

app.use(cors(corsOptions)); // alows frontend access to backend
app.use(express.json()); // defines that request can be JSON

/*////////////////////////////////////////////////////////////////////////////
                DATABASE
*/////////////////////////////////////////////////////////////////////////////

const database = new DataBase();
database.initialize();
(async () => {
    await database.authenticate();
    await database.syncronize();
})();

/*////////////////////////////////////////////////////////////////////////////
                PUBLISH PORT
*/////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

/*////////////////////////////////////////////////////////////////////////////
                EXPOSE ENDPOINTS
*/////////////////////////////////////////////////////////////////////////////

const authControl = new AuthController(app, new AuthService(new AuthRepository(UserEntity(database.sequelize))));
authControl.start();

const taskControl = new TaskController(app, authControl, new TaskService(new TaskRepository(TaskEntity(database.sequelize), StatusEntity(database.sequelize))));
taskControl.start();

const statusControl = new StatusController(app, authControl, new StatusService(new StatusRepository(StatusEntity(database.sequelize))));
statusControl.start();


export default app;