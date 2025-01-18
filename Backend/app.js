import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())
// app.use(cors({
//     origin: `http://localhost:5173/`, // Allow only specific origin
//     methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
//     allowedHeaders: 'Content-Type,Authorization,id', // Allowed headers
// }));

app.use(cors({
    origin: `*`, // Allow only specific origin
    methods: "*", // Allowed HTTP methods
    allowedHeaders: '*', // Allowed headers
}));

// app.use(bodyParser.urlencoded({ extended: true })); // true or false based on your requirements


import router from './routes/user.routes.js'; // Correct import
app.use('/users', router);  // Use userRouter here

import Studentrouter from './routes/student.route.js'; //import router from student router
app.use('/users/student', Studentrouter);

export default app;