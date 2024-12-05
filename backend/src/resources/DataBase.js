import dotenv from "dotenv";
import Sequelize from "sequelize";

import UserEntity from "../domain/UserEntity.js";
import TaskEntity from "../domain/TaskEntity.js";
import StatusEntity from "../domain/StatusEntity.js";

dotenv.config();

export default class DataBase {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
    }

    async initialize() {
        console.log('initialize');

        // Define Models
        const Status = await StatusEntity(this.sequelize);
        const Task = await TaskEntity(this.sequelize, Status);
        const User = await UserEntity(this.sequelize);

        // Define associations
        Task.belongsTo(Status, {
            constraint: true,
            foreignKey: 'id_status'
        });
    }
    
    async authenticate() {
        console.log('authenticate');
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw(error);
        }
    }

    async syncronize() {
        console.log('syncronize');
        try {
            await this.sequelize.sync(); // {force: true} drops the database
            console.log('Database synchronized');
        } catch (error) {
            console.error('Failed synchronizing database:', error);
        }
    }

    close() {
        console.log('close');
        // will need to create a new Sequelize instance to access your database again.
        this.sequelize.close();
    }

}