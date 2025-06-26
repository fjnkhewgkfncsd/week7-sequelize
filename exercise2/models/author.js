import {DataTypes} from 'sequelize';
import {SequelizeInstance} from '../config/db.js';

const Author = SequelizeInstance.define('Author',{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    authorId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
        autoIncrement: true
    },
    birthday : {
        type : DataTypes.DATE,
        allowNull : true
    }
},
{
    tableName : 'authors',
    timestamps : false,
    underscored: false // Keep this false to maintain camelCase in your code
})

export {Author}