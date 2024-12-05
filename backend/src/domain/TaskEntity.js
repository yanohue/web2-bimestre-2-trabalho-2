import { DataTypes } from "sequelize";


const TaskEntity = (sequelize) => {
    const Task = sequelize.define('task', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
        },
        creationDate: {
            field: 'creationDate',
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        dueDate: {
            field: 'dueDate',
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        active: {
            field: 'active',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        id_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
    
    return Task
}

export default TaskEntity;