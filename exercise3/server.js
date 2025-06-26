import {sequelize} from './config/db.js'
import express from 'express'
import router from './routes/attendance.js'

sequelize.sync();

const app = express();
app.use(express.json())
app.use('/api',router)

app.listen(3000,() => {
    console.log('server is running')
}
)