const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const errorHandler = require('./middleWare/errorMiddleware')
const cookieParser = require("cookie-parser")
const path = require('path')

const app = express()
// middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(bodyParser.json())
app.use(cookieParser())

// upload image
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
// routes middleware
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)


const PORT = process.env.PORT || 5000;

app.get('/', (req,res)=>{
 res.send("HomePage")
})

// error handler
app.use(errorHandler)

// connect to mongoDb
mongoose
       .connect(process.env.MONGO_URI)
       .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`)
        })
       })
       .catch((err)=>{
         console.log(err)
       })