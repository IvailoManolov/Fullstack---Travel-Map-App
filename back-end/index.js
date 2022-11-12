const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

dotEnv.config()

const application = express()

application.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Mongo DB connected")
})
.catch((err) => console.log('\x1b[41m%s\x1b[0m',"[FAILED]Mongo DB failed to connect" + err))

application.use("/api/pins",pinRoute)
application.use("/api/users",userRoute)

application.listen(8800,() => {
    console.log(process.env.MONGO_URL)
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Backend server started")
})