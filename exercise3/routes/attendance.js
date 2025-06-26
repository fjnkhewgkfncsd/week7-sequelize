import express from 'express';
import {
    markAttendance,
    getStudentAttendanceByDate,
    getClassAttendance,
    getStudentAttendanceSummary
} from '../controller/main.js';

const router = express.Router();

// 1. Mark attendance for a student in a class on a given date
// POST /api/attendance/mark
router.post('/mark', markAttendance);

// 2. Get attendance for a student on a specific date
// GET /api/attendance/student/:studentId/date/:date
router.get('/student/:studentId/date/:date', getStudentAttendanceByDate);

// 3. List attendance for all students in a class
// GET /api/attendance/class/:classId
// Optional query parameter: ?date=2023-12-25
router.get('/class/:classId', getClassAttendance);

// 4. Get attendance summary for a student
// GET /api/attendance/student/:studentId/summary
// Optional query parameters: ?startDate=2023-01-01&endDate=2023-12-31
router.get('/student/:studentId/summary', getStudentAttendanceSummary);

export default router;
