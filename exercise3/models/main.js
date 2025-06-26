import {Class} from './class.js'
import {Student} from './student.js'
import { AttendanceRecord } from './attendanceRecord.js'

Student.belongsToMany(Class,{foreignKey : 'studentId', through : AttendanceRecord   })
Class.belongsToMany(Student,{foreignKey : 'classId', through : AttendanceRecord})
AttendanceRecord.belongsTo(Student,{foreignKey : 'studentId'})
AttendanceRecord.belongsTo(Class,{foreignKey : 'classId'})

export {Class,Student,AttendanceRecord}