import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.js'

const AttendanceRecord = sequelize.define('AttendanceRecord',
    {
        recordId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        studentId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Student', 
                key: 'studentId'
            }
        },
        classId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : 'Class',
                key : 'classId'
            }
        },
        date : {
            type : DataTypes.DATE,
            allowNull : false
        }
    },
    {
        tableName : 'AttendanceRecords',
        timestamps : false
    }
)

export {AttendanceRecord}