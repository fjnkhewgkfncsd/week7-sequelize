import { Class, Student, AttendanceRecord } from '../models/main.js';
import { Op } from 'sequelize';

// 1. Mark attendance for a student in a class on a given date
const markAttendance = async (req, res) => {
    const { studentId, classId, date } = req.body;
    try {
        // Check if student exists
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        // Check if class exists
        const classExists = await Class.findByPk(classId);
        if (!classExists) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }
        // Check if attendance already exists for this student, class, and date
        const existingAttendance = await AttendanceRecord.findOne({
            where: {
                studentId,
                classId,
                date: new Date(date)
            }
        });
        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: 'Attendance already marked for this student in this class on this date'
            });
        }
        // Create attendance record
        const attendance = await AttendanceRecord.create({
            studentId,
            classId,
            date: new Date(date)
        });
        res.status(201).json({
            success: true,
            data: attendance,
            message: 'Attendance marked successfully'
        });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 2. Get attendance for a student on a specific date
const getStudentAttendanceByDate = async (req, res) => {
    const { studentId, date } = req.params;
    try {
        const attendance = await AttendanceRecord.findAll({
            where: {
                studentId,
                date: {
                    [Op.gte]: new Date(date + ' 00:00:00'),
                    [Op.lt]: new Date(date + ' 23:59:59')
                }
            },
            include: [
                {
                    model: Student,
                    attributes: ['studentName']
                },
                {
                    model: Class,
                    attributes: ['className']
                }
            ]
        });
        if (attendance.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No attendance found for this student on this date'
            });
        }
        res.status(200).json({
            success: true,
            data: attendance,
            message: 'Student attendance retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting student attendance:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 3. List attendance for all students in a class
const getClassAttendance = async (req, res) => {
    const { classId } = req.params;
    const { date } = req.query; // Optional date filter
    try {
        // Build where clause
        let whereClause = { classId };
        
        if (date) {
            whereClause.date = {
                [Op.gte]: new Date(date + ' 00:00:00'),
                [Op.lt]: new Date(date + ' 23:59:59')
            };
        }
        const attendance = await AttendanceRecord.findAll({
            where: whereClause,
            include: [
                {
                    model: Student,
                    attributes: ['studentId', 'studentName']
                },
                {
                    model: Class,
                    attributes: ['classId', 'className']
                }
            ],
            order: [['date', 'DESC'], ['studentId', 'ASC']]
        });
        if (attendance.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No attendance records found for this class'
            });
        }
        res.status(200).json({
            success: true,
            data: attendance,
            count: attendance.length,
            message: 'Class attendance retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting class attendance:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 4. Get attendance summary for a student
const getStudentAttendanceSummary = async (req, res) => {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query; // Optional date range
    try {
        // Check if student exists
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        // Build where clause
        let whereClause = { studentId };
        
        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        } else if (startDate) {
            whereClause.date = {
                [Op.gte]: new Date(startDate)
            };
        } else if (endDate) {
            whereClause.date = {
                [Op.lte]: new Date(endDate)
            };
        }
        // Get all attendance records
        const attendanceRecords = await AttendanceRecord.findAll({
            where: whereClause,
            include: [
                {
                    model: Class,
                    attributes: ['classId', 'className']
                }
            ],
            order: [['date', 'DESC']]
        });
        // Calculate summary statistics
        const totalDays = attendanceRecords.length;
        
        // Group by class
        const classSummary = {};
        attendanceRecords.forEach(record => {
            const className = record.Class.className;
            if (!classSummary[className]) {
                classSummary[className] = {
                    classId: record.Class.classId,
                    className: className,
                    daysAttended: 0,
                    dates: []
                };
            }
            classSummary[className].daysAttended++;
            classSummary[className].dates.push(record.date);
        });
        res.status(200).json({
            success: true,
            data: {
                student: {
                    studentId: student.studentId,
                    studentName: student.studentName
                },
                summary: {
                    totalDaysAttended: totalDays,
                    dateRange: {
                        startDate: startDate || 'All time',
                        endDate: endDate || 'All time'
                    },
                    classSummary: Object.values(classSummary)
                },
                detailedRecords: attendanceRecords
            },
            message: 'Student attendance summary retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting attendance summary:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export {
    markAttendance,
    getStudentAttendanceByDate,
    getClassAttendance,
    getStudentAttendanceSummary
};
