import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.js'

const Class = sequelize.define('Class',
    {
        classId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        className : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        tableName : 'classes',
        timestamps : false
    }
)
export {Class}