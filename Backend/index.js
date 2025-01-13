import {connectDB} from "./db/index.js";
import  app from "./app.js";
import dotenv, { config } from "dotenv"


dotenv.config({
    path: './.env'
})


connectDB()
.then( () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is the running on the PORT ${process.env.PORT}`)
    })
})
.catch( (err) => {
    console.log(`DB connection is failed !!! ${err}`)
})
