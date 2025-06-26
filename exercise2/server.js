import { SequelizeInstance }  from "./config/db.js";
import Router  from "./routes/routeAuthor.js";
import express from 'express'

const app = express()
SequelizeInstance.sync();

app.use(express.json())
app.use('/api', Router)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})