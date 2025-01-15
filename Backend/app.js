import express from 'express';


const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
//app.use(cookieParser())


import router from './routes/user.routes.js' // Correct import
app.use('/users', router);  // Use userRouter here




export default app;