require('dotenv').config()
const cors = require('cors')
const express = require('express')
const conn = require('./config/conn')
const UsersRoutes = require('./routes/UsersRoute')
const CourseRoutes = require('./routes/CourseRoute')
const TraineeRoutes = require('./routes/TraineeRoute')
const StudentsRoutes = require('./routes/StudentsRoute')
const InstructorRoutes = require('./routes/InstructorRoute')
const EnrollmentRoutes = require('./routes/EnrollmentRoute')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/users', UsersRoutes)
app.use('/courses', CourseRoutes)
app.use('/trainees', TraineeRoutes)
app.use('/students', StudentsRoutes)
app.use('/intructors', InstructorRoutes)
app.use('/enrollments', EnrollmentRoutes)

conn
  .sync()
  .then(() => app.listen(PORT))
  .catch((err) => console.error(err))
