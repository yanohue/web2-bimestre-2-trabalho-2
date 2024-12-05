import { DataTypes } from "sequelize";

const UserEntity = (sequelize) => {
    const User = sequelize.define('user_account', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return User;
}

export default UserEntity;