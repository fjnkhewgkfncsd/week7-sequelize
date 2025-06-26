import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js'

const Student = sequelize.define('Student',{
    studentId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    studentName : {
        type : DataTypes.STRING,
        allowNull : false
    }
},
{
    tableName : 'students',
    timestamps : false
})

export {Student}