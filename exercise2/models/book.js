import { SequelizeInstance } from "../config/db.js";
import {DataTypes} from 'sequelize';

const Book = SequelizeInstance.define('Book',
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        publicationYear : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        page : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        authorId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'authors', // refers to table name
                key: 'authorId' // refers to column name in authors table
            }
        }
    },
    {
        tableName : 'books',
        timestamps : false,
        underscored: false // Keep this false to maintain camelCase in your code
    }
)
export {Book};