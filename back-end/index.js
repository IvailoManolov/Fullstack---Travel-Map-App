const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")

dotEnv.config()

const application = express()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Mongo DB connected")
})
.catch((err) => console.log('\x1b[41m%s\x1b[0m',"[FAILED]Mongo DB failed to connect" + err))

application.listen(8800,() => {
    console.log(process.env.MONGO_URL)
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Backend server started")
})