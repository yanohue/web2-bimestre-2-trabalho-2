import { DataTypes } from "sequelize";


const StatusEntity = (sequelize) => {
    const Status = sequelize.define('status', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            field: 'status',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Status;
}

export default StatusEntity;