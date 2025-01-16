import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

// app.use(bodyParser.urlencoded({ extended: true })); // true or false based on your requirements


import router from './routes/user.routes.js'; // Correct import
app.use('/users', router);  // Use userRouter here

import Studentrouter from './routes/student.route.js'; //import router from student router
app.use('/users/student', Studentrouter);

export default app;