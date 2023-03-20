const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const express = require("express")
const logger = require("morgan")
const adminRouter= require('./routes/adminRouter')
const userRouter= require('./routes/userRouter')
const connectDb = require('./config/DbConfig')
const adminDB = require('./Model/adminSchema')

const server = express();
server.use(bodyParser.json({limit:'500kb'}))
//connect database
connectDb(DATABASE_URL)
//CORS middleware
server.use(cors({
    origin:['http://localhost:1234'],
    methods:['GET','POST'],
    credentials:true
}))
//middlewares
server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(express.static("public"))
server.use(cookieParser())

//user Route
server.use('/',userRouter)
//Admin Route
server.use('/admin',adminRouter)

server.listen(port,()=>{
    console.log(`Server Listenig at: http://127.0.0.1:${port}`);
})

module.exports = server
